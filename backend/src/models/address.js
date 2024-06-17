import mongoose from "mongoose";
const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    cityLeeched: String,
    districtLeech: String,
    communeAddress: String,
    apartmentNumber: String,
    detailAddress: String,
    customerId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Address", addressSchema);
