const express=require("express")
const router=express.Router()
const {check}=require("express-validator")
var {GetSubject,NewSubject,UpdateSubject,GetSubjectByID,Delete_Subject,MultipleSubejct,

    addsubject,
    getsubject,
    editsubject
}=require("../controllers/SubjectController")









// ----------------------update  design-------------------------------------------------

router.post("/addsubject/:instu_id/:regu_id/:dep_id",addsubject);
router.get("/getsubject/:instu_id/:regu_id/:dep_id",getsubject);
router.put("/editsubject/:instu_id/:regu_id/:dep_id/:subject_id",editsubject);












//new Subject
router.post("/NewSubject/:ins_id/:course_id/:dept_id/:sem_id",check("Subject_ID").exists().withMessage("Subject_Id is missing"),
check("Subject_Name").exists().withMessage("Subject_Name is missing"),
check("isActive").exists().withMessage("isActive is missing"),
check("Department_ID").exists().withMessage("Department_Id is missing"),
check("Type").exists().withMessage("Subject Type is missing"),NewSubject);


//update the Subject
router.put("/UpdateSubject/:id",UpdateSubject);
//get Subject by id
router.get("/GetSubjectByID/:id",GetSubjectByID)

//get the all Subjects
router.get("",GetSubject);

//bulk new Subject
router.post("/MultipleSubject",MultipleSubejct);

//delete the subject
router.delete("/Delete_Subject/:id",Delete_Subject);

//get Subjects according to semester
















module.exports=router;