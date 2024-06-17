import mongoose from "mongoose";
const newsSchema = new mongoose.Schema(
    {
        tieude: String,
        noidung: String,
        image: Array,
        trang_thai: String

    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("News", newsSchema);
