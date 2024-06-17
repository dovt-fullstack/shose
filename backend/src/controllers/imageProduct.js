import { imageProductSchema } from "../Schema/product.js";
import imageProduct from "../models/imageProduct.js";
import Product from "../models/product.js";

export const getAll = async (req, res) => {
  try {
    const data = await imageProduct.find().populate("products");
    if (data.length == 0) {
      return res.status(400).json({ message: "Lấy danh sách ảnh thất bại" });
    } else {
      return res.status(200).json({
        message: "Lấy danh sách ảnh thành công",
        data,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: message });
  }
};
export const get = async (req, res) => {
  try {
    const data = await imageProduct.findById(req.params.id);
    if (data.length == 0) {
      return res.status(400).json({ message: "Lấy ảnh 1 thất bại" });
    } else {
      // lấy sản phẩm chứa danh mục
      const products = await Product.find({ imageId: req.params.id });

      return res.status(200).json({
        ...data.toObject(),
        products,
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
  }
};
export const add = async (req, res) => {
  try {
    // Validate
    const { error } = imageProductSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const data = await imageProduct.create(req.body);

    if (!data) {
      return res.status(400).json({ message: "Thêm ảnh thất bại" });
    } else {
      return res.status(200).json({
        message: "Thêm ảnh thành công",
        data,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    //validate
    const { error } = imageProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const data = await imageProduct.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (data.length == 0) {
      return res.status(400).json({ message: "Cập nhật ảnh thất bại" });
    } else {
      return res.status(200).json({
        message: "Cập nhật ảnh thành công",
        data,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: message });
  }
};
export const remove = async (req, res) => {
  try {
    const data = await imageProduct.findByIdAndDelete(req.params.id);
    if (data.length == 0) {
      return res.status(400).json({ message: "Xóa ảnh thất bại" });
    } else {
      return res.status(200).json({
        message: "Xóa ảnh thành công",
        data,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: message });
  }
};
