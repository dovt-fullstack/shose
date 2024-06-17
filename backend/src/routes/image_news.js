import express from "express";
import {
  create,
  get,
  getAll,
  remove,
  update,
} from "../controllers/image_news.js";
import { checkPermission } from "../middlewares/checkPermission.js";
const router = express.Router();
router.get("/imagetintuc", getAll);
router.get("/imagetintuc/:id", get);
router.post("/imagetintuc/", create);
router.put("/imagetintuc/:id", update);
router.delete("/imagetintuc/:id", remove);
export default router;
