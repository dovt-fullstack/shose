import Category from "../models/category.js";
import {CategorySchema} from "../Schema/category.js"
export const get = async (req, res) => {
    try {
        const data = await Category.find()
        if (data.length === 0) {
          return res.json({
            message: "Không có sản phẩm nào !",
          });
        }
        return res.send({
            message: "Tìm danh mục thành công",
            data: data
        })
    } catch (err) {
        return res.send({
            message: err
        })
    }
}

export const getById = async (req, res) => {
    const id = req.params.id
    const data = await Category.findById(id)
    
    if (data) {
        res.send({
            message: "Tìm danh mục thành công",
            data: data
        })
    } else {
        res.status(404).send("Danh mục không tồn tại")
    }
    res.end()
}

export const create = async (req, res) => {
    try {
        const { error } = CategorySchema.validate(req.body);
        if (error) {
            return res.status(400).json({
              message: error.details[0].message,
            });
          }
          
        const body = req.body
        const data = await Category.create(body)
        res.send({
            message: "Thêm mới thành công",
            data: data
        })
    } catch (err) {
        return res.send({
            message: err
        })
    }
}

export const update = async (req, res) => {
    try {
      const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!data) {
        return res.status(404).json({
          message: "Không tìm thấy thương hiệu",
        });
      }
      return res.status(200).json({
        message: "Sửa thương hiệu thành công",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  };


  export const remove = async (req, res) => {
    try {
        const data = await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Xóa thương hiệu thành công",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};