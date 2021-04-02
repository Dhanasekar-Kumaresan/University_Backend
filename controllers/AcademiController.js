const { request } = require("express");
const { validationResult } = require("express-validator");
const Academic = require("../models/Academic_Year");

//get all data
exports.GetAcademic = (req, res) => {
  Academic.find()
    .then((data) => {
     return  res.status(200).json({ data: data });
    })
    .catch((error) => {
     return res.status(500).json({ error: error });
    });
};

//get by id
exports.GetAcademicById = (req, res) => {
  console.log(req.params.id);
  Academic.findOne({ Batch_ID: req.params.id })
    .then((data) => {
      if (!data) {
      return   res.status(404).json({ msg: "Id Not Found" });
      } else {
        return  res.status(200).json({data:data});
      }
    })
    .catch((error) => {
     return res.status(500).json({ msg: "Server error", error: error });
    });
};

//post data
exports.NewAcademic = (req, res) => {
  console.log(req.body);
    var Error=validationResult(req);
    if(!Error.isEmpty())
    {
        return res.status(400).json({msg:"Bad Request",error:Error});
    }

  var academic = new Academic(req.body);
  academic
    .save()
    .then((result) => {
     return res.status(201).json({ data: result, msg: "successs" });
    })
    .catch((error) => {
      return res.status(404).json({ error: error, msg: "Error" });
    });
};

//delete the academic
exports.DeleteAcademic=(req,res)=>
{
    console.log(req.params.id);
    Academic.deleteOne({Batch_ID:req.params.id}).then((result)=>
    //todo...............

  // console.log(result.result.n);
    {
        return res.status(200).json({msg:"Deleted succeess",result:result});
    }).catch((error)=>
    {
        return res.status(500).json({msg:"Server error maapi",error:error});
    })
}