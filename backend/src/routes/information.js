import express from "express";
import {
  create,
  remove,
  get,
  getById,
  update,
} from "../controllers/information.js";
// import { checkPermission } from "../middlewares/checkPermission.";
const router = express.Router();
router.get("/information", get);
router.get("/information/:id", getById);
router.post("/information", create);
router.patch("/information/:id", update);
router.delete("/information/:id", remove);

export default router;