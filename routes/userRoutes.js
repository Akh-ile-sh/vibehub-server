import express from "express";
import {
  addRemoveFriend,
  getUser,
  getUserFriends,
} from "../controller/userController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.put("/:id/:friendId/addRemoveFriend", verifyToken, addRemoveFriend);

export default router;
