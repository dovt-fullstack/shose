import express from "express";
import {
    signin, signup, getAll, remove, update, get, signupUser, signout, updateAdmin, changePassword, forgotPassword, otpauthentication, resetPassword, resendOTP
} from "../controllers/user.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router();
router.get("/user", getAll);
router.get("/user/:id", get);
router.delete("/user/:id", remove);
router.put("/user/:id", update);
router.put("/userrole/:id", updateAdmin);
router.post("/signup", signup);
router.post("/signupuser", signupUser);
router.post("/signin", signin);
router.post("/signout", signout);
router.patch('/user/changePassword/:userId',changePassword);
router.patch('/auth/forgotpassword', forgotPassword);
router.patch('/auth/otpauthentication', otpauthentication);
router.patch('/auth/resetpassword', resetPassword);
router.patch('/auth/resendotp', resendOTP)

export default router;