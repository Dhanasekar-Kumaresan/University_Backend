const express=require("express")
const router=express.Router()
const {check}=require("express-validator")
const {New_Department,getDepartments,GetDepartmentById}=require("../controllers/DepartmentController")



//new Subject
router.post("/New_Department",check("DEPARTMENT_ID").exists().withMessage("DEPARTMENT_ID is missing"),New_Department)

router.get("/getDepartments/:ins_id/:course_id",getDepartments);

router.get("/:id",GetDepartmentById)

module.exports=router;