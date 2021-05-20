const Course = require("../models/Course");
const Departments = require("../models/department-model");
const Institution = require("../models/institution-model");
var ObjectId = require('mongoose').Types.ObjectId; 
async function getDepartments(req, res) {
    try {
      let department = await Departments.find({});
      if (!department.length) {
        return res
          .status(200)
          .json({ success: false, message: `Department not found` });
      }
      return res.status(200).json({ success: true, data: department });
    } catch {
      return res.status(400).json({
        success: false,
        message: "Unknown error in fetching Department!!! Contact Admin",
      });
    }
  }
async function addDepartments(req, res) {
    let body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        message: "Need a valid input",
      });
    }
    try {
      let institution_Details= await Institution.findOne({Institution_id:req.params.institute})

        // let institution= await Institution.aggregate(
        //     [ 
        //         {$unwind : "$courseDetails"},
        //         {$match: {"courseDetails.Course_id":req.params.course} }
        //     ]
        // )
        // if(institution && institution_Details)
        // {

        //     body.Course_id = institution[0].courseDetails._id;
        // }
        institution_Details.courseDetails.forEach(element => {
          if(element.Course_id == req.params.course)
          {
            body.Course_id = element._id
          }
        });
       let department_body= new Departments(body)
        let departments=await department_body.save();
  
      if (departments) {
        return res
          .status(200)
          .json({
            success: true,
            message: "Departments Added Successfully",
          });
      }
      else{
          console.log("Error")
      }
    } catch (err) {
        console.log(err);
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          return res
            .status(422)
            .send({ succes: false, message: "Departments already exist!" });
        }
        return res.status(422).send(err);
      }
    }
  }
  module.exports = {
    getDepartments,
    addDepartments
  };