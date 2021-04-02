const express=require("express")
const router=express.Router()
const {check}=require("express-validator")
var {GetAcademic,NewAcademic,GetAcademicById, DeleteAcademic}=require("../controllers/AcademiController");



//get the academic
router.get("/",GetAcademic);
//get the academic by bacthid
router.get("/AcademicById/:id",GetAcademicById);
//delete the academic
router.delete("/DeleteAcademic/:id",DeleteAcademic);


//create new academic data
router.post("/NewAcademic",check("Batch_ID").exists().withMessage("Batch_ID is missing"),
check("Batch_Name").exists().withMessage("Batch_Name is missing"),
check("curriculum_ID").exists().withMessage("curriculum_ID is missing"),
 
NewAcademic);
module.exports=router;