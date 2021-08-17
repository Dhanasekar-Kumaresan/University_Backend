const { validationResult } = require("express-validator");
const Regulation = require("../models/Regulation");
const Department_Details = require("../models/DepartmentDetails");
const { json } = require("body-parser");
const { Mongoose } = require("mongoose");

//create Regulation
exports.New_Regulation = (req, res) => {
  var Errors = validationResult(req);
  if (!Errors.isEmpty()) {
    console.log("bad request");
    return res.status(400).json({ errors: Errors.errors });
  }

  const regulation = new Regulation(req.body);
  regulation
    .save()
    .then(() => {
      console.log("Data saved");
      return res.status(201).json({ msg: "Success" });
    })
    .catch((error) => {
      console.log("Data not saved");
      return res.status(401).json({ msg: "Error", error: error });
    });
};
//fetch all regulation
exports.GetRegulation = (req, res) => {
  console.log("get Regulation");
  //res.send("get Regulation");
  Regulation.find()
    .then((items) => {
      console.log(items);
      return res.status(200).json({ data: items });
    })
    .catch((error) => {
      return res.status(500).json({ error: error });
    });
};

//get details by one id
exports.GetRegulationById = (req, res) => {
  Regulation.findOne({ Regulation_ID: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ error: "Regulation not found" });
      } else {
        return res.status(200).json({ data: data });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: "Server Error" });
    });
};

//update regulation by id
exports.Update_RegulationById = (req, res) => {
  console.log(req.body);
  console.log("updation" + req.params.id);
  Regulation.updateOne({ Regulation_ID: req.params.id }, req.body)
    .then((data) => {
      if (data.n) {
        return res.status(200).json({ msg: "Updation Success " });
      } else {
        return res.status(404).json({ msg: "Updation Error,Id Not Found " });
      }
    })
    .catch((error) => {
      return res.status(404).json({ error: error });
    });
};

//delete Regulation
exports.DeleteRegulation = (req, res) => {
  console.log(req.params.id);
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("id is missing");
    return res.status(400).json({ error: errors });
  }
  Regulation.deleteOne({ Regulation_ID: req.params.id })
    .then(() => {
      return res
        .status(200)
        .json({ msg: "Deletion Success", id: req.params.id });
    })
    .catch((error) => {
      return res.status(404).json({ error: error });
    });
};

// -----------------------------------------------------------------------------------------------------------------------

//updated Design

exports.newregulation = (req, res) => {
  var Payload = req.body;
  console.log(Payload.Regulation[0].Department_Details);
  Regulation.find({ Institution_id: req.params.id })
    .then((data) => {
      if (!data.length) {
        console.log("if")
        var regulation = new Regulation({
          Institution_id: req.params.id,
          Regulation: Payload.Regulation
        });
        console.log(regulation);
        regulation
          .save()
          .then((data) => {
            return res.status(200).json({ msg: "Success", data: data });
          })
          .catch((error) => {
            return res.status(404).json({ msg: "errors", error: error });
          });
      }
      else
      {
        console.log("else");
       Regulation.updateOne(
        {Institution_id:req.params.id},
        {$push:{"Regulation":Payload.Regulation}})
        .then((data)=>
        {
          return res.status(200).json({ msg: "Success", data: data });
        })
        .catch((error) => {
          return res.status(404).json({ msg: "error", error: error });
        });


      }
    })
    .catch((error) => {
      console.log("rere",error);
    });
};

//all regulation
exports.getregulation = (req, res) => {
  Regulation.find()
    .then((data) => {
      return res.status(200).json({ msg: "Success", data: data });
    })
    .catch((error) => {
      return res.status(404).json({ error: error });
    });
};

//fetch by id
exports.getregulationbyid = (req, res) => {
  Regulation.findOne({ Institution_id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ error: "Regulation not found" });
      } else {
        return res.status(200).json({ data: data });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: "Server Error" });
    });
};

//getdepartmentdetailsbyid
exports.getdepartmentdetailsbyid = async (req, res) => {
  console.log(req.params.instu_id);
  Regulation.findOne({$and:[{Institution_id: req.params.instu_id,Regulation:{$elemMatch:{Regulation_ID:req.params.regu_id}}}
  
  
  ]},{"Regulation.$":1})
    .then((data) => {
      console.log(!data.length);
      if (!data.length) {
        return res.status(200).json({"msg": "success",data: data });
       
      } else {
         return res.status(404).json({ error: "Department not found" });
      }
    })
    .catch((error) => {
      return res.status(404).json({ msg: "Regulation/Institution Not Found" });
    });
};

//delete regulation
exports.deleteregulation=(req,res)=>
{
  // console.log("delete")
  regulation=req.params.regu_id;
  instituion=req.params.instu_id;
  console.log(regulation,instituion)

Regulation.updateOne(
  {Institution_id: req.params.instu_id},
  {$pull : {"Regulation" : {"Regulation_ID":regulation}}}

)  .then((data) => {
  console.log(!data.length);
  if (data["nModified"]) {
    return res.status(200).json({"msg": "success",data: data });
   
  } else {
     return res.status(404).json({ error: "Regulation not found" });
  }
})
.catch((error) => {
  return res.status(404).json({ msg: "Regulation/Institution Not Found" });
});

}

//GET Regulations for a particular institution in array format
exports.getRegulationsForInstitution = async function getRegulationsForInstitution(req, res) {
  try {
    let regData = await Regulation.find({Institution_id:req.body.ins_id});
    if (!regData.length) {
      return res
        .status(200)
        .json({ success: false, message: `Institution not found` });
    }
    else{
    let regSet = new Set();
    regData[0].Regulation.forEach((input)=>{
      regSet.add(input.Regulation_ID);
    });
    return res.status(200).json(Array.from(regSet));}
  } catch(error){
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}


//GET Departments for a particular regulation in an institution in array format
exports.getRegDepts = async function getRegDepts(req, res) {
  try {
    let depData =await Regulation.aggregate(
      [
     {
       $unwind:"$Regulation"
     }
     ,
     {
       $unwind:"$Regulation.Department_Details"
     }
     ,
     {$match:{"Institution_id": req.body.ins_id,
       "Regulation.Regulation_ID":req.body.reg_id
       }}
       ,
      {
        $project:{"Regulation.Grading":0, "Regulation.evaluationCriteria":0}
      }
     
     
     ]);
     var depArray = [];
     if(depData){
        //console.log(depData.length);
        for(var k = 0; k<depData.length; k++){
          depArray.push({departmentID: depData[k].Regulation.Department_Details.Department_ID,
          departmentName: depData[k].Regulation.Department_Details.Department_Name});

        }
      }
   
   return res.status(200).json({msg:"sucess",depArray})
    
  }  catch(error){
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

//GET all curriculums for a Department in a particular regulation for an institution in array format
exports.getRegDeptCurs = async function getRegDeptCurs(req, res) {
  try {
    let curData =await Regulation.aggregate(
      [
     {
       $unwind:"$Regulation"
     }
     ,
     {
       $unwind:"$Regulation.Department_Details"
     }, 
     {
      $unwind:"$Regulation.Department_Details.Curriculum_Details"
    },
     
     {$match:{"Institution_id": req.body.ins_id,
       "Regulation.Regulation_ID":req.body.reg_id,
       "Regulation.Department_Details.Department_ID":req.body.dep_id
       }}
       ,
      {
        $project:{"Regulation.Grading":0, "Regulation.evaluationCriteria":0, "Regulation.Department_Details.Subject":0}
      }
     
     
     ]);
     var curArray = [];
     if(curData){
        //console.log(curData.length);
        for(var k = 0; k<curData.length; k++){
          curArray.push({
            Curriculum: curData[k].Regulation.Department_Details.Curriculum_Details.Curriclum_Code,
            BatchYear: curData[k].Regulation.Department_Details.Curriculum_Details.Batch_Year
          });
        }
      }
   
   return res.status(200).json({msg:"sucess",curArray})
    
  }  catch(error){
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}