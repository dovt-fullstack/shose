import mongoose from "mongoose";
const imageProductSchema = new mongoose.Schema(
  {
    image: {
      type: Array,
    },
    trang_thai: {
      type: String,
      enum: ["active", "deactive"],
      default: "active",
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("imageProduct", imageProductSchema);
