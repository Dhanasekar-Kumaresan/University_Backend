const {validationResult}=require("express-validator");
const SubjectFaculty = require("../models/SubjectFaculty");

//Adding a faculty to a subject
exports.addFaculty=(req,res)=>{
  var Errors=validationResult(req);
    if (!Errors.isEmpty()) {
        console.log("bad request");
        return res.status(400).json({ errors: Errors.errors });
      }
     SubjectFaculty.create(req.body)
        .then((data) => {
        console.log("Faculty added!");
        return res.status(201).json({ msg: "Success" ,data:data});
        })
        .catch((e) => {
        console.log(e);
        return res.status(401).json({ msg: e });
        });
}

exports.getFacultyDetails=(req,res)=>
{console.log(req.body.ins_id);
    SubjectFaculty.findOne({$and:[{institutionID: req.body.ins_id},{courseID: req.body.course_id},{departmentID: req.body.dept_id},{semesterID : req.body.sem_id},{subjectID : req.body.sub_id},{academicYear : req.body.acad_year}]})
    .then((subjectFacultyDetails)=>{
    console.log(subjectFacultyDetails);
    return res.status(200).json(subjectFacultyDetails);
    }).catch((e)=>{
        console.log(e);
    return res.status(500).json({error:e});
    });
}
