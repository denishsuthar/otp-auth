import express from "express";
import { VerifyOtp, signUp } from "../controller/userController.js";

const router = express.Router();

router.route("/signup").post(signUp)
router.route("/signup/verify").post(VerifyOtp)


export default router