const express=require("express");
const router=express.Router();
const {check}=require("express-validator");


const {newcurriculum,getcurriculum}=require("../controllers/CurriculumController");

router.post("/newcurriculum/:instu_id/:regu_id/:dep_id",newcurriculum);

router.get("/getcurriculum/:instu_id/:regu_id/:dep_id/:batch_year",getcurriculum);


module.exports=router;