const express=require("express")
const router=express.Router()
const {check}=require("express-validator")
var {GetSubject,NewSubject}=require("../controllers/SubjectController")




//new Subject
router.use("/NewSubject",check("Subject_ID").exists().withMessage("Subject_Id is missing"),
check("Subject_Name").exists().withMessage("Subject_Name is missing"),
check("isActive").exists().withMessage("isActive is missing"),
check("Department_ID").exists().withMessage("Department_Id is missing"),
check("Type").exists().withMessage("Subject Type is missing"),NewSubject);
//get the all Subjects
router.use("",GetSubject);

module.exports=router;