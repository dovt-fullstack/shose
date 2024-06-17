import Size from "../models/size.js";
import { sizeSchema } from "../Schema/size.js";
export const getAllSize = async (req, res) => {
  try {
    const data = await Size.find();
    if (data.length == 0) {
      return res.status(404).json({ message: "Lấy tất size thất bại" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const getSize = async (req, res) => {
  try {
    const data = await Size.findById(req.params.id);
    if (data.length == 0) {
      return res.status(400).json({ message: "Lấy size 1 thất bại" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
  }
};
export const createSize = async (req, res) => {
  try {
    const { error } = sizeSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const size = new Size(req.body);
    const newSize = await size.save();
    res.status(200).json(newSize);
  } catch (error) {
    res.status(500).json({ error: "Could not create size" });
  }
};
export const updateSize = async (req, res) => {
  try {
    const { error } = sizeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const size = await Size.findById(req.params.id);
    if (!size) {
      return res.json({
        message: "Cập nhật size không thành công !",
      });
    }
    const newSize = await Size.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json({
      message: "Cập nhật size thành công !",
      newSize,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
  }
};
export const removeSize = async (req, res) => {
  try {
    const size = await Size.findByIdAndDelete(req.params.id);
    if (!size) {
      return res.json({
        message: "Xóa size không thành công !",
      });
    }
    return res.json({
      message: "Xóa size thành công !",
      size,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
  }
};
