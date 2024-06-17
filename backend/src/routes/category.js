import express from "express";
import {
  create,
  remove,
  get,
  getById,
  update,
} from "../controllers/category.js";
import { checkPermission } from "../middlewares/checkPermission.js";
// import { checkPermission } from "../middlewares/checkPermission.";
const router = express.Router();
router.get("/categorys", get);
router.get("/categorys/:id", getById);
router.post("/categorys", create);
router.patch("/categorys/:id", update);
router.delete("/categorys/:id", remove);

export default router;
