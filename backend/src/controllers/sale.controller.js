import product from "../models/product.js";
import SaleModel from "../models/sale.model.js";

export const getList = async (req, res) => {
    try {
        const payments = await SaleModel.find(req.query);
        res.status(200).json({
            meassge: "Lấy danh sách mã giảm giá thành công!!",
            data: payments,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getByCode = async (req, res) => {
    try {
        const currentDate = new Date().toISOString();
        const sale = await SaleModel.findOne({ code: req.params.code, expirationDate: { $gt: currentDate } });
        res.json({
            meassge: "Success",
            data: sale,
        });
    } catch (error) {
        console.log(error);
    }
};
export const getById = async (req, res) => {
    try {
        const payment = await SaleModel.findById(req.params.id);
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
        const newPayment = await SaleModel.create(req.body);
        res.json({
            meassge: "New sale success",
            data: newPayment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const update = async (req, res) => {
    try {
        const paymentUpdated = await SaleModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            meassge: "Update sale success",
            data: paymentUpdated,
        });
    } catch (error) {
        res.status(500).json(serverError(error.message));
    }
};
export const decreaseSale = async (req, res) => {
    try {
        const paymentUpdated = await SaleModel.findByIdAndUpdate(req.params.id, { $inc: { usageLimit: -1 } }, { new: true });
        res.json({
            meassge: "Update sale success",
            data: paymentUpdated,
        });
    } catch (error) {
        res.status(500).json(serverError(error.message));
    }
};

export const destroy = async (req, res) => {
    try {
        const paymentDestroyed = await SaleModel.findByIdAndRemove(req.params.id);
        res.json({
            meassge: "Delete sale successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
