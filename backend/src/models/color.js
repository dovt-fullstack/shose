import mongoose from "mongoose";
const colorSchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Color", colorSchema);
