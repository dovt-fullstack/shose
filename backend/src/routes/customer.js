import express from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  signinCustomer
} from "../controllers/customer.js";

const router = express.Router();

router.post("/signupcustomer", createCustomer);
router.get("/customer", getCustomers);
router.get("/customer/:id", getCustomerById);
router.put("/customer/:id", updateCustomer);
router.delete("/customer/:id", deleteCustomer);
router.post("/signincustomer", signinCustomer);

export default router;