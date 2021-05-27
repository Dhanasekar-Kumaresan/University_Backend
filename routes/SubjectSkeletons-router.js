const express = require("express")
const router = express.Router()
const {check}=require("express-validator")

const {createSubjectSkeletons,getSubjectSkeletonByDefaults}=require("../controllers/SubjectSkeletonsController")


router.post("/addSubjectSkeletons",createSubjectSkeletons)
router.get("/getSubjectSkeletonByDefaults",getSubjectSkeletonByDefaults)

module.exports=router;

