const express=require("express")
const router=express.Router()
const {check}=require("express-validator")


var {addFaculty, getCalendarEventDetails} = require("../controllers/SubjectFacultyController")

router.post("/addEvent/",addFaculty);
router.post("/getCalendarEvent/",getCalendarEventDetails);

module.exports=router;