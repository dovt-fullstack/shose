import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";
dotenv.config();
export const checkPermission = async (req, res, next) => {
    try {
    // Bước 1: kiểm tra thông tin token gửi có không? Nếu không có thì thông báo cần phải đăng nhập
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Bước 2: Lấy token bằng cách chuyển từ chuỗi sang mảng và lấy phần tử thứ 2
    const token = req.headers.authorization.split(" ")[1];
    // Bước 3: Kiểm tra token gửi có không? Nếu không có thì thông báo cần phải đăng nhập
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Bước 4: Giải mã token và lấy ID, kiểm tra ID tồn tại trong db không?
    const { id } = jwt.verify(token, process.env.SECRET_CODE);
    // Bước 5: Kiểm tra quyền của user có phải là admin không? Nếu không phải thì thông báo không có quyền truy cập tài nguyên
    const user = await User.findById(id);
    // Bước 6: Nếu hợp lệ thì cho phép truy cập tài nguyên
    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Bạn không có quyền truy cập tài nguyên" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "No token provided" });
  }
};
// Bước 1: kiểm tra thông tin token gửi có không? Nếu không có thì thông báo cần phải đăng nhập
// Bước 2: Lấy token bằng cách chuyển từ chuỗi sang mảng và lấy phần tử thứ 2
// Bước 3: Kiểm tra token có hợp lệ không? Nếu không hợp lệ thì thông báo cần phải đăng nhập
// Bước 4: Giải mã token và lấy ID, kiểm tra ID tồn tại trong db không?
// Bước 5: Kiểm tra quyền của user có phải là admin không? Nếu không phải thì thông báo không có quyền truy cập tài nguyên
// Bước 6: Nếu hợp lệ thì cho phép truy cập tài nguyên
// Bước 7: Gắn middleware vào router nào cần check quyền
