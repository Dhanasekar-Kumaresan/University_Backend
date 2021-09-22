const express = require("express")
const router = express.Router()
const {check}=require("express-validator")

const {createSubjectSkeletons,
    getSubjectSkeletonByDefaults,
    addSubjectSkeletonToSubject,
    getSubjectSkeletonSubjectID,
    updateSubjectSkeletons,
    getSubjectSkeletonByType} = require("../controllers/SubjectSkeletonsController")


router.post("/addSubjectSkeletons",createSubjectSkeletons)
router.get("/getSubjectSkeletonByDefaults",getSubjectSkeletonByDefaults)
router.post("/addSubjectSkeletonToSubject/:ins_id/:reg_id",addSubjectSkeletonToSubject)
router.post("/getSubjectSkeletonSubjectID",getSubjectSkeletonSubjectID)
router.put("/updateSubjectSkeletons/:subject_type",updateSubjectSkeletons),
router.post("/getSubjectSkeletonByType",getSubjectSkeletonByType)

module.exports=router;

