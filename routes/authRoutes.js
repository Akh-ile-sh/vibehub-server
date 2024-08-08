const express = require("express");
const { login } = require("../controller/authController.js");

const router = express.Router();

router.post("/login", login);

module.exports = router;
