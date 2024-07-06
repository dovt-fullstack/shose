import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: false,
    },
    fullname: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
      required: false,
    },
    rating: {
      // type: Number,
      // required: true,
      // min: 0,
      // max: 5,
      type: Number,
      required: false,
    },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Comment", CommentSchema);
