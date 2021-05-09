const express=require("express")
const router=express.Router()
const {check}=require("express-validator")
const {New_Semester,getSemesterList,getSubjectsInSpecificSem}=require("../controllers/SemesterController")



//new Subject
router.post("/New_Semester",check("SEMESTER_ID").exists().withMessage("SEMESTER_ID is missing"),New_Semester)
router.get("/getSemesterList/:ins_id/:course_id/:dept_id",getSemesterList);
router.get("/getSubjectsInSpecificSem/:ins_id/:course_id/:dept_id/:sem_id",getSubjectsInSpecificSem);

module.exports=router;