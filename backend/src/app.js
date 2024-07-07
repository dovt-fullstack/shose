import "dotenv/config.js";
import nodemailer from "nodemailer";

import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import orderRoute from "./routes/orderRoute.js";
import paymentRouter from "./routes/payment.router.js";
import routerAddress from "./routes/address.js";
import routerCart from "./routes/cart.js";
import routerCategory from "./routes/category.js";
import routerColor from "./routes/color.js";
import routerComment from "./routes/comment.js";
import routerContact from "./routes/contact.js";
import routerCustomer from "./routes/customer.js";
import routerFavoriteProduct from "./routes/favoriteProduct.js";
import routerImageProduct from "./routes/imageProduct.js";
import routerInformation from "./routes/information.js";
import routerNews from "./routes/tb_new.js";
import routerPayment from "./routes/vnpay.router.js";
import routerProduct from "./routes/product.js";
import routerRole from "./routes/role.js";
import routerSize from "./routes/size.js";
import routerUser from "./routes/user.js";
import routerWarehose from "./routes/warehose.js";
import routerimage_news from "./routes/image_news.js";
import saleRouter from "./routes/sale.router.js";
import checkoutVnpay from "./controllers/vnpay.js";
import routeranalytics from "./routes/anilytic.js";
import bodyParser from "body-parser";
import User from "./models/user.js";
import moment from "moment";
//config
const app = express();
const API_DB = process.env.API_DB;
// middleware
app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:4000"],
  })
);
app.use(express.json());
app.use(bodyParser());

// router
app.use("/api", routerCategory);
app.use("/api", routerContact);
app.use("/api", routerInformation);
app.use("/api", routerCart);
app.use("/api", routerFavoriteProduct);
app.use("/api", routerComment);
app.use("/api", routerAddress);
app.use("/api", routerNews);
app.use("/api", routerRole);
app.use("/api", orderRoute);
app.use("/api", routerNews);
app.use("/api", routerimage_news);
app.use("/api", routerImageProduct);
app.use("/api", routerPayment);
app.use("/api/payments", paymentRouter);
app.use("/api/sales", saleRouter);
app.use("/api", routerProduct);
app.use("/api", routerUser);
app.use("/api", routerSize);
app.use("/api", routerColor);
app.use("/api", routerCustomer);
app.use("/api", routerWarehose);
app.use("/api", routeranalytics);
app.post("/create-checkout-vnpay", checkoutVnpay.payment);
const sendEmailOrder = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "longhdph28352@fpt.edu.vn",
      pass: "qnwggskitxtjpaax",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: "forgotPassword",
    subject: data.subject,
    text: data.text,
    html: data.html
      ? data.html
      : `
  <div class="col-md-12">
   otp : ${data.otp}
  </div>

  `,
    to: data.to,
  });
};
app.post("/confirm-mail", async (req, res) => {
  try {
    const { mail } = req.body;
    const data = await User.findOne({ email: mail });
    if (!data) {
      return res.status(404).json({
        status: false,
        message: "email không tồn tại !",
      });
    }
    const dataRamrom = Math.floor(1000 + Math.random() * 9000);
    data.otp = dataRamrom;
    const dataEmail = {
      createdAt: moment(new Date()).format(" HH:mm:ss ĐD-MM-YYYY"),
      to: mail,
      text: "Hi!",
      subject: "otp",
      otp: dataRamrom,
    };
    await sendEmailOrder(dataEmail);
    await data.save();
    return res.status(200).json("success");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});
app.post("/check-otp", async (req, res) => {
  try {
    const { otp, mail } = req.body;
    const data = await User.findOne({ email: mail });
    console.log(data);
    if (data.otp == otp) {
      return res.status(200).json({
        status: true,
      });
    } else {
      return res.status(200).json({
        status: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});
// database config
mongoose
  .connect(API_DB)
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("Database connect failed");
  });
export const server = http.createServer(app);
// export const viteNodeApp = app;
server.listen(8080, (req, res) => {
  try {
    console.log("User Agent:");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on 8080 ${8080} `);
});
