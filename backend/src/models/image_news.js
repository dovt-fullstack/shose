import mongoose from "mongoose";
const { Schema } = mongoose;
import paginate from "mongoose-paginate-v2";
const image_newsSchema = new Schema(
  {
    trang_thai: String,
    image: Array,
    Id_news: {
      type: mongoose.Types.ObjectId,
      ref: "news",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
image_newsSchema.pre("save", function (next) {
  next();
});
image_newsSchema.plugin(paginate);
export default mongoose.model("image_news", image_newsSchema);
