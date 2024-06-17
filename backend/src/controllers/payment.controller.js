import PaymentModel from "../models/payment.model.js";
import product from "../models/product.js";
import user from "../models/user.js";

export const getList = async (req, res) => {
    try {
        const payments = await PaymentModel.find().populate([
            {
                path: "user",
                model: user,
                // select: { name: true, phone_number: true, email: true },
            },
        ]);
        res.status(200).json({
            meassge: "Lấy danh sách người thanh toán thành công!!",
            data: payments,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getById = async (req, res) => {
    try {
        const payment = await PaymentModel.findById(req.params.id);
        res.json({
            meassge: "Success",
            data: payment,
        });
    } catch (error) {
        console.log(error);
    }
};
export const create = async (req, res) => {
    try {
        const newPayment = await PaymentModel.create(req.body);
        res.json({
            meassge: "New payment success",
            data: newPayment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const destroy = async (req, res) => {
    try {
        const paymentDestroyed = await PaymentModel.findByIdAndRemove(req.params.id);
        res.json({
            meassge: "Delete payment successfully",
            data: paymentDestroyed,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
