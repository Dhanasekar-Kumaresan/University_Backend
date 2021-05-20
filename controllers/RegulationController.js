const { validationResult } = require("express-validator");
const Regulation = require("../models/Regulation");
const Department_Details=require("../models/DepartmentDetails");
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
      return res.status(401).json({ msg: "Error" ,error:error});
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
      return res.status(200).json({ msg: "Deletion Success",id:req.params.id });
    })
    .catch((error) => {
      return res.status(404).json({ error: error });
    });
};


// --------------------------------------------------------------------------------


//updated Design 

exports.newregulation=(req,res)=>
{
var Payload=req.body;


var regulation=new Regulation(
  {
    Regulation_ID:Payload.Regulation_ID,
    Regulation_Name:Payload.Regulation_Name,
    Academic_Year:Payload.Academic_Year,
    Grading:Payload.Grading,
    Department_Details:Payload.Department_Details
  });



regulation.save().then((data)=>
{
  return res.status(200).json({"msg":"Success",data:data})
}).
catch((error)=>
{
return res.status(404).json({"msg":"error",error:error})
})




  // regulation and Department_Details seperate

// Regulation.findOneAndUpdate({Regulation_ID:Payload.Regulation_ID},{Department_Details:data._id}).then((data_1)=>{data_1["msg"]="success";return data_1}).catch((error)=>{error["msg"]="error"; return error})

 
// var Department_Result=await department_Details.save().then((data)=> 
//  {
//     //console.log("department data",data)
//     Regulation.findOne({Regulation_ID:Payload.Regulation_ID}).then((item)=>
//     {
//       //console.log("item",item._id);
//       Regulation.findByIdAndUpdate(item._id,
//         {
//           $push:{Department_Details:data._id}          
//         },
//         { new: true, useFindAndModify: false }).then((data_1)=>
//         {
//           return data_1;
//         }).
//         catch((error)=>
//         {
//           return error;
//         })
//     }).catch((error)=>
//     {
//       //console.log("Error is find",error);
//     }) 

    
//   }).catch((error)=>
  
// {
//   return error;
// })

// console.log("Department_Result",Department_Result);

}

//all regulation
exports.getregulation=(req,res)=>
{
Regulation.find().then((data)=>
{
  return res.status(200).json({"msg":"Success",data:data});
}).catch((error)=>{return res.status(404).json({ error: error })})
}

//fetch by id
exports.getregulationbyid=(req,res)=>
{
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
}


//getdepartmentdetailsbyid
exports.getdepartmentdetailsbyid=async(req,res)=>
{
  Department_Details.findById(req.params.id).then((data)=>
  {
    if (!data) {
      return res.status(404).json({ error: "Department not found" });
    } else {
      return res.status(200).json({ data: data });
    }
  }).catch((error)=>
  {
    return res.status(500).json({ error: "Server Error" });
  })
}