import express from "express";
import {
  getFeedPost,
  getUserPost,
  likePost,
} from "../controller/postController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/feed", verifyToken, getFeedPost);
router.get("/:userId/feed", verifyToken, getUserPost);

router.patch("/:id/like", verifyToken, likePost);

export default router;
