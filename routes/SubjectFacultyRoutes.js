const express=require("express")
const router=express.Router()
const {check}=require("express-validator")


var {addFaculty, getFacultyDetails} = require("../controllers/SubjectFacultyController")

router.post("/addFaculty/",addFaculty);
router.get("/getsubject/:ins_id/:course_id/:dept_id/:sem_id/:sub_id/:acad_year",getFacultyDetails);

module.exports=router;