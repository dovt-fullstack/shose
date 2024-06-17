// giống category
import { UpdatenewsSchema, newsSchema } from "../Schema/product.js";
import News from "../models/tb_news.js";
import Image_news from "../models/image_news.js";
export const getAll = async (req, res) => {
  try {
    const data = await News.find();

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
    const tintuc = await News.findOne({ _id: req.params.id })
    if (!tintuc) {
      return res.status(400).json({ message: "Lấy ảnh thất bại" });
    }
    res.status(200).json({
      tieude
        : tintuc.tieude, noidung: tintuc.noidung, trang_thai: tintuc.trang_thai, image: tintuc.image
    });
  } catch (error) {
    if (error.tieude === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
  }
};
export const add = async (req, res) => {
  try {
    //validate
    const { error } = newsSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((error) => error.message),
      });
    }
    const {
      tieude,
      noidung,
      image,
      trang_thai,

    } = req.body;
    const tintuc = await News.create({
      tieude,
      noidung,
      image,
      trang_thai,
    });
    if (!tintuc) {
      return res.json({
        message: "Thêm không thành công !",
      });
    }
    return res.json({
      message: "Thêm tin tức thành công !",
      tintuc ,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const update = async (req, res) => {
  try {
    //validate
    // const { tieude,noidung, trang_thai } = req.body;
    // const validation = updateRoleSchema.validate({
    //   role_name,
    //   description,
    //   // trang_thai,
    // });
    const { error } = UpdatenewsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const data = await News.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    if (data.length == 0) {
      return res.status(400).json({ message: "Cập nhật tin tức thất bại" });
    } else {
      return res.status(200).json({
        message: "Cập nhật tin tức thành công",
        data,
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
  }
};
export const deletenews = async (req, res) => {
  try {
    const data = await News.findByIdAndDelete(req.params.id);
    if (data.length == 0) {
      return res.status(400).json({ message: "Xóa tin tức thất bại" });
    } else {
      return res.status(200).json({
        message: "Xóa tin tức thành công",
        data,
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
  }
};
