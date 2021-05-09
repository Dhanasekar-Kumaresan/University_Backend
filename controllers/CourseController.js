const {validationResult}=require("express-validator");
const Course = require("../models/Course");

//Adding a Course to an Institution
exports.addCourse=(req,res)=>{
  var Errors=validationResult(req);
    if (!Errors.isEmpty()) {
        console.log("bad request");
        return res.status(400).json({ errors: Errors.errors });
      }
     // var course = new Course(req.body);
      Course.create(req.body)
        .then((data) => {
        console.log("Course added!");
        return res.status(201).json({ msg: "Success" ,data:data});
        })
        .catch((e) => {
        console.log(e);
        return res.status(401).json({ msg: e });
        });
}

//get all courses related to a Institution
exports.getCourses=(req,res)=>
{
    Course.find({INSTITUTION_ID: req.params.id})
    .then((courseList)=>{
    console.log(courseList);
    return res.status(200).json({data: courseList});
    }).catch((error)=>{
    return res.status(500).json({error:error});
    });
}
