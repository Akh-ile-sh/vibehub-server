import express from "express";
import { login, register } from "../controller/authController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").get(login);

export default router;
