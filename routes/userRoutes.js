const express = require("express");
const {
  addRemoveFriend,
  getUser,
  getUserFriends,
} = require("../controller/userController.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.patch("/:id/:friendId/addRemoveFriend", verifyToken, addRemoveFriend);

module.exports = router;
