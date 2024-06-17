import Comment from "../models/comment.js";
import Product from "../models/product.js";

// Tạo bình luận mới
export const createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    if (!comment) {
      return res.json({
        message: "Thêm bình luận không thành công! ",
      });
    }
    res.status(201).json({
      message: "Thêm bình luận thành công ",
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getComments = async (req, res) => {
  try {
    const data = await Comment
    .find();

    if (data.length == 0) {
      return res.status(404).json({ message: "Lấy tất cả " });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};


//  xóa bình luận
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.commentId,
      // userId: req.params.userId,
      // productId: req.params.productId,
    });

    if (!comment) {
      return res.json({
        message: "Xóa bình luận không thành công !",
      });
    }
    // Cập nhật totalComments và rating trong đối tượng product
    const product = await Product.findById(req.params.productId);
    product.totalComments -= 1;

    if (product.totalComments === 0) {
      product.rating = 0;
    } else {
      product.rating =
        (product.rating * (product.totalComments + 1) - comment.rating) /
        product.totalComments;
      product.rating = Math.round(product.rating * 2) / 2; // Làm tròn rating
    }
    await product.save();

    res.json({
      message: "Xóa bình luận thành công !",
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// sửa bình luận
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      {
        _id: req.params.commentId,
        userId: req.params.userId,
        productId: req.params.productId,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!comment) {
      return res.json({
        message: "Sửa bình luận không thành công !",
      });
    }

    res.json({
      message: "Sửa bình luận thành công !",
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// lấy 1 bình luận
export const getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.json({
        message: "Lấy bình luận không thành công !",
      });
    }
    return res.json({
      message: "Lấy 1 bình luận thành công !",
      comment,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
  }
};

//   try {
//     const comment = await Comment.findById(req.params.id);
//     if (!comment) {
//       return res.json({
//         message: "Lấy bình luận không thành công !",
//       });
//     }
//     return res.json({
//       message: "Lấy 1 bình luận thành công !",
//       comment,
//     });
//   } catch (error) {
//     if (error.name === "CastError") {
//       return res.status(400).json({ message: "Id không hợp lệ" });
//     }
//   }
// };