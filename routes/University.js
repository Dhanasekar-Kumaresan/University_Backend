const express=require("express")
const router=express.Router()
const {check}=require("express-validator")
const {NewUniversity}=require("../controllers/UniversityController")

const {}=require("../controllers/UniversityController")
router.post("/NewUniversity",NewUniversity);


module.exports=router;