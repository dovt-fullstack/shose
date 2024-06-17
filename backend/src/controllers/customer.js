import Customer from "../models/customer.js";
import { signinSchema, signupSchema, updateSchema } from "../Schema/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Product from "../models/product.js";
dotenv.config();

const { SECRET_CODE, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

export const createCustomer = async (req, res) => {
  const { name, fullname, ngaysinh, status, email, password, image_url } =
    req.body;

  try {
    // validate đầu vào
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);

      return res.status(400).json({
        messages: errors,
      });
    }
    // Kiểm tra trong db có tk không?
    const customerExist = await Customer.findOne({ email: req.body.email });
    if (customerExist) {
      return res.status(400).json({
        messages: "Email đã tồn tại",
      });
    }
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const customer = await Customer.create({
      name,
      fullname,
      ngaysinh,
      email,
      image_url,
      password: hashedPassword,
    });
    customer.password = undefined;

    // Gửi email thông báo tạo tài khoản thành công
    const mailOptions = {
      from: "your-email@example.com", // Địa chỉ email gửi your-email@example.com
      to: email, // Địa chỉ email người nhận
      subject: "Chào Mừng đến với SneakerStore", // Tiêu đề email
      text: "Chúc mừng bạn đã đăng ký thành công!", 

    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    return res.status(201).json({
      message: "Tạo tài khoản thành công",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const signinCustomer = async (req, res) => {
  try {
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);

      return res.status(400).json({
        messages: errors,
      });
    }

    const customer = await Customer.findOne({ email: req.body.email });
    if (!customer) {
      return res.status(400).json({
        messages: "Email không tồn tại",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, customer.password);
    if (!isMatch) {
      return res.status(400).json({
        messages: "Sai mật khẩu",
      });
    }
    const token = jwt.sign({ id: customer._id }, SECRET_CODE, { expiresIn: "1d" });
    customer.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Loi server!",
    });
  }
};


export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();

    if (customers.length === 0) {
      return res.json({
        message: "Không có customer nào!",
      });
    }

    return res.json({
      message: "Lấy danh sách customer thành công!",
      customers,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.json({
        message: "Xóa customer không thành công",
      });
    }
    return res.json({
      message: "Xóa customer thành công",
      customer,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
  }
};


export const updateCustomer = async (req, res) => {
  try {
    // Lấy thông tin customer từ cơ sở dữ liệu
    const customer = await Customer.findById(req.params.id).populate("addressUser");
    if (!customer) {
      return res.status(404).json({ message: "Không tìm thấy customer" });
    }

    // So sánh mật khẩu cũ đã hash với mật khẩu mới được gửi từ client
   

    // Validate thông tin cần update
    const { error } = updateSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((error) => error.message),
      });
    }
    const passwordsMatch = await bcrypt.compare(
      req.body.confirmPassword,
      customer.password
    );
    if (!passwordsMatch) {
      return res.status(400).json({ message: "Mật khẩu không khớp" });
    }
    // Thực hiện update thông tin customer
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.json({
      message: "Cập nhật sản phẩm thành công!",
      customer: updatedCustomer,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
    return res.status(500).json({ message: "Lỗi server" });
  }
};


export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate("addressUser");
    const favoriteProduct = await Product.find({
      _id: { $in: customer.favoriteProducts },
    });
    if (!customer) {
      return res.json({
        message: "Lấy customer không thành công!",
      });
    }
    return res.json({
      message: "Lấy thông tin customer thành công!",
      customer,
      favoriteProduct,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
  }
};


