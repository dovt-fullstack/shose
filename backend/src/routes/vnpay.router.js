import express from "express";
import PayMentController from "../controllers/vnpay.controller.js";

const routerPayment = express.Router();

routerPayment.post("/vnpay/create-url", PayMentController.createUrl);
routerPayment.get("/vnpay/vnpay_ipn", PayMentController.getDataReturn);

export default routerPayment;
