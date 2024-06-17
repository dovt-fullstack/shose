import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    ngaysinh: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    trang_thai: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    image_url: {
      type: String,
    },
    favoriteProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FavoriteProduct",
      },
    ],
    addressUser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);


export default mongoose.model("Customer", customerSchema);