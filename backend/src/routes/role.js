import express from "express";
import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
  findRoleByName
} from "../controllers/role.js";

const router = express.Router();
router.post("/roles", createRole);
router.get("/roles", getRoles);
router.get("/roles/:roleId", getRoleById);
router.put("/roles/:roleId", updateRole);
router.delete("/roles/:roleId", deleteRole);
router.get("/role/:roleName", findRoleByName)

export default router;
