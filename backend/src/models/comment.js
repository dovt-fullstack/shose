import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
      required: false,
    },
    // rating: {
    //   type: Number,
    //   required: true,
    //   min: 0,
    //   max: 5,
    // },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Comment", CommentSchema);
