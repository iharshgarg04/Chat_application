const express = require("express");
const { protect } = require("../middlewares/auth");
const { accessChat, fetchChats, createGroupChat, fetchGroup, addTogroup } = require("../controller/chatController");
const router = express.Router();

router.post("/",protect,accessChat);
router.get("/",protect,fetchChats);
router.post("/createGroup",protect,createGroupChat);
router.get("/fetchGroups",protect,fetchGroup);
router.put("/addUsers",protect,addTogroup);
// router.put("/groupExit",protect,groupExit);

module.exports = router;