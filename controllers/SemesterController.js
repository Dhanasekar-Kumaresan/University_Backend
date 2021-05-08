const { validationResult } = require("express-validator")
const Semester = require("../models/Semester")
const Subject = require("../models/Subject")


//create semester
exports.New_Semester = (req, res) => {
    var Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        console.log("bad request");
        return res.status(400).json({ errors: Errors.errors });
    }

    const semester = new Semester(req.body);
    semester
        .save()
        .then((data) => {
            console.log("Data saved");
            return res.status(201).json({ msg: "Success", data: data });
        })
        .catch((e) => {
            console.log("Data not saved" + e);
            return res.status(401).json({ msg: "Error" });
        });
}

//get semesters 
exports.getSemesterList =(req,res)=>
{console.log(req.params.ins_id, req.params.course_id,req.params.dept_id);
    Semester.find({$and:[{INSTITUTION_ID: req.params.ins_id},{COURSE_ID: req.params.course_id},{DEPARTMENT_ID: req.params.dept_id}]}).then((items)=>
  {
    console.log(items);
 return res.status(200).json({data:items});
  }).catch((error)=>{
    return res.status(500).json({error:error});
  });
}

//get subjects in specific sem
exports.getSubjectsInSpecificSem = (req,res)=>{
  Semester.findOne({$and:[{INSTITUTION_ID: req.params.ins_id},{COURSE_ID: req.params.course_id},{DEPARTMENT_ID: req.params.dept_id},{SEMESTER_ID : req.params.sem_id}]}).then((item)=>{
  Semester.findById(item._id).populate("SUBJECTS","Subject_Name -_id").select("-SEMESTER_ID -DEPARTMENT_ID -COURSE_ID -INSTITUTION_ID -_id -__v").then((data)=>{
      console.log(data);
      return res.status(200).json({data:data});
    }).catch((e)=>{console.log(e)});
  }).catch((e)=>{
    return res.status(500).json({error:error});
  });
  }

