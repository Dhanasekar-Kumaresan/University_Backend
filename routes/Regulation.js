const express=require("express");
const router=express.Router();
const {check}=require("express-validator");

var {New_Regulation,GetRegulation,
    DeleteRegulation,Update_RegulationById,
    GetRegulationById,newregulation,
    getregulation,getregulationbyid,
    getdepartmentdetailsbyid,deleteregulation,
    getRegulationsForInstitution, getRegDepts, getRegDeptCurs} = require("../controllers/RegulationController");



//Updated Design
router.post("/newregulation/:id",newregulation);
router.get("/getdepartmentdetailsbyid/:instu_id/:regu_id",getdepartmentdetailsbyid);
router.get("/getregulation/:id",getregulationbyid);
router.get("/getregulation",getregulation);
router.put("/deleteregulation/:instu_id/:regu_id",deleteregulation);
 

router.post("/all/",getRegulationsForInstitution);
router.post("/departments/",getRegDepts);
router.post("/departments/curriculums",getRegDeptCurs);









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