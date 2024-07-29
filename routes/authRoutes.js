import express from "express";
import { login, register } from "../controller/authController.js";

const router = express.Router();

router.route("/register").post(register);
router.post("/login", login);

export default router;
