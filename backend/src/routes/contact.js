import express from "express";
import {
  create,
  remove,
  get,
  getById,
  update,
} from "../controllers/contact.js";
// import { checkPermission } from "../middlewares/checkPermission.";
const router = express.Router();
router.get("/contact", get);
router.get("/contact/:id", getById);
router.post("/contact", create);
router.patch("/contact/:id", update);
router.delete("/contact/:id", remove);

export default router;