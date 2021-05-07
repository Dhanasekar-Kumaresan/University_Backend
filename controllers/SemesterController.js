const { validationResult } = require("express-validator")
const Semester = require("../models/Semester")



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