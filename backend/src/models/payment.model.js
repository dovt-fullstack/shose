import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
    {
        code: { type: String, default: "" },
        user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        status: { type: String, require: true, enum: ["success", "pending", "error"], default: "pending" },
        message: { type: String },
        totalPrice: { type: Number, required: true },
        payment_function: { type: String, enum: ["banking", "cash"], default: "cash" },
    },
    { timestamps: true, collection: "payment" }
);

const PaymentModel = mongoose.model("payment", PaymentSchema);
export default PaymentModel;
