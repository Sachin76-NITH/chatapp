const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
     fetchGroups,
     groupExit,
     addSelfToGroup
 
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",protect, accessChat);
router.get("/",protect, fetchChats);
router.post("/creategroup",protect, createGroupChat);
router.get("/fetchGroups",protect, fetchGroups);
// router.put("/groupremove",protect, removeFromGroup);
router.put("/groupExit",protect,groupExit);
router.put("/addSelftoGroup",protect,addSelfToGroup);
module.exports = router;