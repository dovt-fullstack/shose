import express from "express";
import {
    GetAll,
    addAddress,
    deleteAddress,
    getAddressById,
    updateAddress

} from "../controllers/address.js";
import { checkPermission } from "../middlewares/checkPermission.js";
const router = express.Router();
router.get("/address", GetAll);
router.get("/address/:id", getAddressById);
router.post("/address", addAddress);
router.put("/address/:id", updateAddress);
router.delete("/address/:id", deleteAddress);
export default router;  