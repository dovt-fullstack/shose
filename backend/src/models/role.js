import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  role_name: { 
    type: String
  },
  description: { type: String },
  trang_thai: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Role", roleSchema);
