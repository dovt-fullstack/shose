import express from "express";
import { warehouseControllers } from "../controllers/warehouse.js";

const router = express.Router();
router.get("/warehose", warehouseControllers.getAllWareHouse);
// router.get("/size/:id", getSize);
router.post("/warehose/",  warehouseControllers.createWarehouse);
router.get("/warehose/:id",  warehouseControllers.getIdWareHouse);
router.put("/warehose/:id",  warehouseControllers.updateWarehouse);
router.put("/status-update/warehose/:id",  warehouseControllers.isActiveWareHouse);
router.delete("/warehose/:id",  warehouseControllers.deleteWarehouse);

// router.delete("/size/:id",  removeSize);
export default router;
