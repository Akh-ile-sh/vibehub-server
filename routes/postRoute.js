const express = require("express");
const {
  getFeedPost,
  getUserPost,
  likePost,
} = require("../controller/postController.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

router.get("/feed", verifyToken, getFeedPost);
router.get("/:userId/feed", verifyToken, getUserPost);

router.patch("/:id/like", verifyToken, likePost);

module.exports = router;
