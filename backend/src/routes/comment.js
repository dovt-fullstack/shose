import express from "express";
import {
  createComment,
  getComments,
  deleteComment,
  getComment,
  updateComment,
} from "../controllers/comment.js";

const router = express.Router();
// Route tạo bình luận mới
router.post("/comments", createComment);
router.get("/comments/:id", getComment);
router.put("/comments/:commentId/:userId/:productId", updateComment);
router.get("/comments", getComments);
router.delete("/comments/:commentId", deleteComment);

export default router;
