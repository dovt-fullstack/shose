import mongoose from "mongoose";
const { Schema } = mongoose;
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    image: Array,
    description: String,
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    warehouseId: {
      type: mongoose.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    listQuantityRemain: [
      {
        colorHex: String,
        nameColor: String,
        nameSize: String,
        quantity: Number,
      },
    ],
    is_deleted: {
      type: Boolean,
      default: false,
    },
    hot_sale: {
      type: Number,
      required: false,
    },
    inventoryStatus: {
      type: String,
      enum: ["INSTOCK", "LOWSTOCK", "OUTOFSTOCK"],
    },
    status: {
      type: String,
      enum: ["0", "1"],
      default: "0",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Product", productSchema);
