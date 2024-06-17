import express from "express";
import { add, remove, get, getAll, update } from "../controllers/imageProduct.js";
import { checkPermission } from "../middlewares/checkPermission.js";
const router = express.Router();
router.get("/imageProduct", getAll);
router.get("/imageProduct/:id", get);
router.post("/imageProduct", add);
router.put("/imageProduct/:id", update);
router.delete("/imageProduct/:id", remove);

export default router;
