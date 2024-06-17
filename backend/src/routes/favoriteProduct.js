import express from "express";
const router = express.Router();
import { createFavoriteProduct,removeFavoriteProduct } from "../controllers/favoriteProduct.js";
router.post("/favoriteProducts", createFavoriteProduct);
router.delete("/favoriteProducts", removeFavoriteProduct);
export default router;