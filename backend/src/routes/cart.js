import express from "express";
import {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
} from "../controllers/cart.js";
const router = express.Router();
router.get("/cart", getAllCarts);
router.get("/cart/:id", getCartById);
router.post("/cart", createCart);
router.put("/cart/:id", updateCart);
router.delete("/cart/:userId/products/:productId", deleteCart);

export default router;
