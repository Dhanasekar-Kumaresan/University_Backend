const express=require("express")
const router=express.Router()
const {check}=require("express-validator")
const {New_Department,GetDepartment,GetDepartmentById}=require("../controllers/DepartmentController")



//new Subject
router.post("/New_Department",check("Department_ID").exists().withMessage("Department_ID is missing"),New_Department)

router.get("/",GetDepartment);

router.get("/:id",GetDepartmentById)

module.exports=router;