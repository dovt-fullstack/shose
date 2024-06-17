import express from "express";
import {
  createSize,
  getAllSize,
  getSize,
  removeSize,
  updateSize,
} from "../controllers/size.js";
import { checkPermission } from "../middlewares/checkPermission.js";
const router = express.Router();
router.get("/size", getAllSize);
router.get("/size/:id", getSize);
router.post("/size/",  createSize);
router.put("/size/:id",  updateSize);
router.delete("/size/:id",  removeSize);
export default router;
