import Product from "../models/product.js";
import { productSchema, UpdateProduct } from "../Schema/product.js";
import mongoose from "mongoose";

export const getAll = async (req, res) => {
  try {
    const products = await Product.find({ is_deleted: false })
      .populate("categoryId")
      .populate("warehouseId");
    if (products.length === 0) {
      return res.json({
        message: "Không có sản phẩm nào !",
      });
    }
    const productsWithSaleName = products.map((product) => ({
      ...product._doc,
      categoryId: product.categoryId ? product.categoryId._id : "No category",
    }));

    return res.json({
      message: "Lấy danh sách sản phẩm thành công !",
      products: productsWithSaleName,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("categoryId")
      .populate("warehouseId");

    if (!product) {
      return res.json({
        message: "Lấy sản phẩm không thành công !",
      });
    }
    const productWithSaleName = {
      ...product._doc,
      categoryId: product.categoryId ? product.categoryId._id : "No category",
      warehouseId: product.warehouseId ? product.warehouseId._id : ""

      // Thay đổi trường 'sale' thành tên của 'sale'
    };
    return res.json({
      message: "Lấy 1 sản phẩm thành công !",
      product: productWithSaleName,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
    return res.status(400).json({ message: "errr" + error });
  }
};
export const create = async (req, res) => {
  try {
    const listQuantityRemain = Array.from(req.body.listQuantityRemain);
    const { error } = productSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((error) => error.message),
      });
    }
    const product = await Product.create({
      ...req.body,
      listQuantityRemain,
    });
    return res.json({
      message: "Thêm sản phẩm thành công !",
      product,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = UpdateProduct.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((error) => error.message),
      });
    }

    const id = req.params.id;

    // Kiểm tra xem ID có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID sản phẩm không hợp lệ",
      });
    }

    // Lấy thông tin sản phẩm từ yêu cầu
    const updatedProduct = req.body;

    const product = await Product.findByIdAndUpdate(id, updatedProduct, {
      new: true,
    });

    if (!product) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm để cập nhật",
      });
    }

    return res.json({
      message: "Cập nhật sản phẩm thành công",
      product: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
//xóa tạm thời
export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { is_deleted: true },
      { new: true }
    );
    if (!product) {
      return res.json({
        message: "Xóa sản phẩm không thành công !",
      });
    }
    return res.json({
      message: "Xóa sản phẩm thành công !",
      product,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
  }
};
//xóa vinh viễn
export const removeProduct = async (req, res) => {
  try {
    // Find and remove the product by ID
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.json({
        message: "Xóa sản phẩm không thành công hoặc sản phẩm không tồn tại!",
      });
    }

    return res.json({
      message: "Xóa sản phẩm thành công!",
      product: deletedProduct,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
    return res.status(400).json({
      message: error.message,
    });
  }
};
//lấy danh sách đã xóa
export const getDeletedProducts = async (req, res) => {
  try {
    const products = await Product.find({ is_deleted: true }).populate("image");
    if (products.length === 0) {
      return res.json({
        message: "Không có sản phẩm nào !",
      });
    }
    return res.json({
      message: "Lấy danh sách sản phẩm thành công !",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
//khôi phục
export const restoreProduct = async (req, res) => {
  try {
    // Find the product by ID and update is_deleted to false
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { is_deleted: false },
      { new: true }
    );

    if (!product) {
      return res.json({
        message:
          "Khôi phục sản phẩm không thành công hoặc sản phẩm không tồn tại!",
      });
    }

    return res.json({
      message: "Khôi phục sản phẩm thành công!",
      product,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
    return res.status(400).json({
      message: error.message,
    });
  }
};
//tìm kiếm
export const searchProducts = async (req, res) => {
  try {
    const searchQuery = new RegExp(req.params.name, "i");

    // Kiểm tra tính hợp lệ của tên trước khi thực hiện tìm kiếm
    if (!searchQuery.test(req.params.name)) {
      return res.status(400).json({
        message: "Tên không hợp lệ",
      });
    }

    const products = await Product.find({
      name: searchQuery,
      is_deleted: false,
    });
    return res.status(200).json({
      message: "Sản phẩm tìm thấy",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
