import mongoose from "mongoose";

const { Schema } = mongoose;
const Category = new Schema({
  name: {
    type: String,
  },
  desciption: {
    type: String,
  },
  image: {
    type: Array,
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Category", Category);
