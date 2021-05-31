const express=require("express")
const router=express.Router()
const {check}=require("express-validator")


var {addFaculty, getFacultyDetails} = require("../controllers/SubjectFacultyController")

router.post("/addFaculty/",addFaculty);
router.post("/getsubject/",getFacultyDetails);

module.exports=router;