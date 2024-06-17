//giống product
import Image_news from "../models/image_news.js";
import { image_newsSchema, Updateimage_newsSchema } from "../Schema/product.js";
export const getAll = async (req, res) => {
  try {
    const data = await Image_news.find();

    if (data.length == 0) {
      return res.status(404).json({ message: "Lấy tất cả " });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const get = async (req, res) => {
  try {
    const image_news = await Image_news.findById(req.params.id);
    if (!image_news) {
      return res.json({
        message: "Lấy ảnh  không thành công !",
      });
    }
    return res.json({
      message: "Lấy 1 ảnh thành công !",
      image_news,
    });
  } catch (error) {
    if (error.tieude === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
  }
};
export const create = async (req, res) => {
  try {
    //validate
    const { error } = image_newsSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: error.details.map((error) => error.message),
      });
    }
    // Lấy thông tin từ request body
    const { image, trang_thai, Id_news } = req.body;

    // Tạo sản phẩm mới với thông tin đã được format
    const image_news = await Image_news.create({
      image,
      trang_thai,
      Id_news,
    });

    if (!image_news) {
      return res.json({
        message: "Thêm không thành công!",
      });
    }
    return res.json({
      message: "Thêm thành công",
      image_news,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    // Validate
    const { error } = Updateimage_newsSchema
    .validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: error.details.map((error) => error.message),
      });
    }
    // Lấy thông tin sản phẩm từ yêu cầu
    const updatedimage_news = req.body;
    // Cập nhật sản phẩm
    const image_news = await Image_news.findByIdAndUpdate(
      req.params.id,
      updatedimage_news,
      {
        new: true,
      }
    );
    if (!image_news) {
      return res.json({
        message: "Cập nhật không thành công!",
      });
    }
    return res.json({
      message: "Cập nhật thành công!",
      image_news,
    });
  } catch (error) {
    if (error.tieude === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
    return res.status(400).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const image_news = await Image_news.findByIdAndDelete(req.params.id);
    if (!image_news) {
      return res.json({
        message: "Xóa không thành công",
      });
    }
    return res.json({
      message: "Xóa thành công",
      image_news,
    });
  } catch (error) {
    if (error.tieude === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
  }
};
