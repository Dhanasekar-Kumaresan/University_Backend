const express=require("express");
const router=express.Router();
const {check}=require("express-validator");

var {New_Regulation,GetRegulation,DeleteRegulation,Update_RegulationById,GetRegulationById}=require("../controllers/RegulationController");


//create new regulation
router.post("/New_Regulation", 

check('Regulation_ID',"Regulation id is missing").exists(),
check("Regulation_Name","Regulation name is missing").exists(),
check("Academic_Year","Academic year is missing ").exists().isInt().withMessage("Academic year must be Int"),
New_Regulation);

//get one
router.get("/:id",GetRegulationById)


//get all
router.get("/",GetRegulation);
//update
router.put("/Update_Regulation/:id",Update_RegulationById);


//delete
router.delete("/Delete_Regulation/:id",DeleteRegulation);
module.exports=router;