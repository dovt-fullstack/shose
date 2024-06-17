import moment from "moment";
import querystring from "qs";
import crypto from "crypto";
import { paymentSchema } from "../Schema/payment.schema.js";
import PaymentModel from "../models/payment.model.js";

const sortObject = (obj) => {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
};

const config = {
    vnp_TmnCode: "NRQRJA4J",
    vnp_HashSecret: "GLQYEDNCQMOQNNTMBWMPAAEDPWTWLFOH",
    vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    vnp_Api: "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
    vnp_ReturnUrl: "http://localhost:5173/payment",
};

class PayMentController {
    async createUrl(req, res) {
        try {
            const { error } = paymentSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const { bank_code: bankCode = "", vnp_OrderInfo, totalPrice, language = "vn", user } = req.body;
            let date = new Date();
            let createDate = moment(date).format("YYYYMMDDHHmmss");

            let ipAddr =
                req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

            let tmnCode = config.vnp_TmnCode;
            let secretKey = config.vnp_HashSecret;
            let vnpUrl = config.vnp_Url;
            let returnUrl = config.vnp_ReturnUrl + `?user=${user}`;
            let orderId = moment(date).format("DDHHmmss");

            let currCode = "VND";
            let vnp_Params = {};

            vnp_Params["vnp_Version"] = "2.1.0";
            vnp_Params["vnp_Command"] = "pay";
            vnp_Params["vnp_TmnCode"] = tmnCode;
            vnp_Params["vnp_Locale"] = language;
            vnp_Params["vnp_CurrCode"] = currCode;
            vnp_Params["vnp_TxnRef"] = orderId;
            vnp_Params["vnp_OrderInfo"] = vnp_OrderInfo + orderId;
            vnp_Params["vnp_OrderType"] = "other";
            vnp_Params["vnp_Amount"] = totalPrice * 100;
            vnp_Params["vnp_ReturnUrl"] = returnUrl;
            vnp_Params["vnp_IpAddr"] = ipAddr;
            vnp_Params["vnp_CreateDate"] = createDate;

            if (bankCode !== null && bankCode !== "") {
                vnp_Params["vnp_BankCode"] = bankCode;
            }

            vnp_Params = sortObject(vnp_Params);

            let signData = querystring.stringify(vnp_Params, { encode: false });

            let hmac = crypto.createHmac("sha512", secretKey);
            let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
            vnp_Params["vnp_SecureHash"] = signed;
            vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

            return res.status(200).json({ url_redirect: vnpUrl, url_return: config.vnp_ReturnUrl });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getDataReturn(req, res, next) {
        try {
            let vnp_Params = req.query;
            let secureHash = vnp_Params["vnp_SecureHash"];

            let orderId = vnp_Params["vnp_TxnRef"];
            let rspCode = vnp_Params["vnp_ResponseCode"];

            delete vnp_Params["vnp_SecureHash"];
            delete vnp_Params["vnp_SecureHashType"];

            vnp_Params = sortObject(vnp_Params);
            let secretKey = config.vnp_HashSecret;

            const { user, ...obj } = vnp_Params;

            let signData = querystring.stringify(obj, { encode: false });
            let hmac = crypto.createHmac("sha512", secretKey);
            let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
            let paymentStatus = "0";

            let checkOrderId = true;
            let checkAmount = true;
            if (secureHash === signed) {
                if (checkOrderId) {
                    if (checkAmount) {
                        if (paymentStatus == "0") {
                            if (rspCode == "00") {
                                //thanh cong
                                //paymentStatus = '1'
                                // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                                const isMatch = await PaymentModel.findOne({
                                    code: vnp_Params["vnp_TxnRef"],
                                });

                                if (!isMatch) {
                                    const newPayment = await PaymentModel.create({
                                        user,
                                        totalPrice: vnp_Params["vnp_Amount"] / 100,
                                        code: vnp_Params["vnp_TxnRef"],
                                        message: vnp_Params["vnp_OrderInfo"],
                                        payment_method: "banking",
                                        status: "success",
                                    });
                                    res.redirect(`http://localhost:5173/order?code=${vnp_Params["vnp_TxnRef"]}&payment_id=${newPayment._id}`);
                                    return;
                                }
                                res.status(200).json({ RspCode: "00", Message: "Success" });
                            } else {
                                //that bai
                                //paymentStatus = '2'
                                // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                                res.status(200).json({ RspCode: "00", Message: "Success" });
                            }
                        } else {
                            res.status(200).json({
                                RspCode: "02",
                                Message: "This order has been updated to the payment status",
                            });
                        }
                    } else {
                        res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
                    }
                } else {
                    res.status(200).json({ RspCode: "01", Message: "Order not found" });
                }
            } else {
                res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new PayMentController();
