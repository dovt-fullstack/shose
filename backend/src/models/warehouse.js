import mongoose from "mongoose";
const { Schema } = mongoose;

const warehouseSchema = new Schema(
  {
    name: String,
    productId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    allInventory: Number,
    address: String,
    totalSoldOuts: Number,
    phoneNumber: String,
    productInventory: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    status: {
      type: String,
      default: "0",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Warehouse", warehouseSchema);
