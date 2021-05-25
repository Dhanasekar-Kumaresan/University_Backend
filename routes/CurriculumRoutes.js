const express=require("express");
const router=express.Router();
const {check}=require("express-validator");


const {newcurriculum}=require("../controllers/CurriculumController");

router.post("/newcurriculum",newcurriculum);




module.exports=router;