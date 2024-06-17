import mongoose from "mongoose";
const CommentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Comment", CommentSchema);
