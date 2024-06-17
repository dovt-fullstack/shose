import mongoose from "mongoose";
const sizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    quantity: {
      type: Number,
    },
  },

  { timestamps: true, versionKey: false }
);
export default mongoose.model("size", sizeSchema);
