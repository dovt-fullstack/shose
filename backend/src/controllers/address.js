import { addressSchema } from "../Schema/address.js";
import Address from "../models/address.js";
import User from "../models/user.js";

export const GetAll = async (req, res) => {
    try {
        const data = await Address.find();
        if (data.length == 0) {
            return res.status(400).json({ message: "Không có địa chỉ nào" });
        }
        else {
            return res.status(200).json({
                messages: "Lấy danh sách địa chỉ thành công",
                data
            })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address) {
            return res.json({
                message: "Lấy 1 địa chỉ không thành công !",
            });
        }
        return res.json({
            message: "Lấy 1 địa chỉ thành công !",
            address,
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Id không hợp lệ" });
        }
    }
}
export const addAddress = async (req, res) => {
    const { customerId } = req.body

    try {
        //validate
        const { error } = addressSchema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const isValidCustomerId = await User.findById(customerId);
        if (!isValidCustomerId) {
            return res.status(400).json({ message: "Id khách hàng không hợp lệ" })
        }
        const data = await Address.create(req.body)

        await User.findByIdAndUpdate(customerId, {
            $push: { addressUser: data },
        })
        if (!data) {
            return res.status(400).json({ message: "Thêm địa chỉ thất bại" })
        }
        else {
            return res.status(200).json({ message: "Thêm địa chỉ thành công", data })
        }
    } catch (error) {



        return res.status(500).json({ message: error.message });

    }
}
export const updateAddress = async (req, res) => {
    const { customerId } = req.body
    try {
        //validate
        const { error } = addressSchema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        const isValidCustomerId = await User.findById(customerId);
        if (!isValidCustomerId) {
            return res.status(400).json({ message: "Id khách hàng không hợp lệ" })
        }
        const data = await Address.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!data) {
            return res.status(400).json({ message: "Cập nhật địa chỉ thất bại" })

        }
        else {
            return res.status(200).json({ message: "Cập nhật địa chỉ thành công", data })
        }
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(500).json({ message: "Id không hợp lệ" });
        }
        if (error.message.errors) {
            return res.status(500).json({ message: "Id khách hàng không hợp lệ" });
        }
    }
}
export const deleteAddress = async (req, res) => {
    try {
        const data = await Address.findByIdAndDelete(req.params.id);

        // Xóa địa chỉ id khỏi mảng addressUser của User
        await User.findOneAndUpdate(
            { _id: data.customerId },
            { $pull: { addressUser: req.params.id } },
            { new: true }
        );

        if (!data) {
            return res.status(400).json({ message: "Xóa địa chỉ thất bại" });
        } else {
            return res.status(200).json({ message: "Xóa địa chỉ thành công", data: data });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
