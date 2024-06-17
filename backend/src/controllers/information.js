import Information from "../models/information.js";
import {InformationSchema} from "../Schema/information.js"

export const get = async (req, res) => {
    try {
        const data = await Information.find()
        if (data.length === 0) {
          return res.json({
            message: "Không có sản phẩm nào !",
          });
        }
        return res.send({
            message: "complete !",
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
    const data = await Information.findById(id)
    if (data) {
        res.send({
            message: "complete !",
            data: data
        })
    } else {
        res.status(404).send("Không tồn tại")
    }
    res.end()
}

export const create = async (req, res) => {
    try {
        const { error } = InformationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
              message: error.details[0].message,
            });
          }

        const body = req.body
        const data = await Information.create(body)
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
      const data = await Information.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!data) {
        return res.status(404).json({
          message: "Không tìm thấy ",
        });
      }
      return res.status(200).json({
        message: "Sửa thành công",
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
        const data = await Information.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Xóa thành công",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};