const express = require("express")
const router = express.Router()
const {check}=require("express-validator")

const {createSubjectSkeletons,getSubjectSkeletonByDefaults, addSubjectSkeletonToInstitution,updateSubjectSkeletons}=require("../controllers/SubjectSkeletonsController")


router.post("/addSubjectSkeletons",createSubjectSkeletons)
router.get("/getSubjectSkeletonByDefaults",getSubjectSkeletonByDefaults)
router.post("/addSubjectSkeletonToInstitution/:ins_id/:reg_id",addSubjectSkeletonToInstitution)
router.put("/updateSubjectSkeletons/:subject_type",updateSubjectSkeletons)

module.exports=router;

