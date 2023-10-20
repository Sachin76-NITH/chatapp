const express =require("express");
const {Register,Login,allUsers}=require("../controllers/userControllers")
const {protect} =require("../middleware/authMiddleware")
const router=express.Router();

router.post("/",Register);
router.post("/login",Login);
router.get("/fetchUsers",protect,allUsers)
module.exports=router;