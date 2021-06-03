const SubjectSkeletons = require('../models/SubjectSkeletons')
const Regulation = require("../models/Regulation");
const {validationResult}=require("express-validator");

async function createSubjectSkeletons(req,res){
    var Errors=validationResult(req);
    if (!Errors.isEmpty()) {
        console.log("bad request");
        return res.status(400).json({ errors: Errors.errors });
      }
      const  subjectSkeletons = new SubjectSkeletons(req.body);
      try {
        await subjectSkeletons.save();
      return res.status(201).json({ msg: "Success" ,data:subjectSkeletons});;
    } catch (e) {
        return res.status(400).json({ msg: e });
    }
}

async function getSubjectSkeletonByDefaults(req,res){

    try{
     const skeletons = await SubjectSkeletons.find({});
     return res.status(200).json({ msg: "Success", data: skeletons })
    }catch(e){
        return res.status(400).json({ msg: e });
    }

}

async function addSubjectSkeletonToInstitution(req,res){
    var institution=req.params.ins_id;
    var regulation=req.params.reg_id;
    try{
    await Regulation.updateOne(
    {
        Institution_id:institution,
        Regulation:{ $elemMatch:{ Regulation_ID:regulation}}
    },
    {
        $push:
        {
          "Regulation.$.evaluationCriteria":req.body
        }
    })
    return res.status(200).json({ success: true });}
    catch(err){
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }  
}

async function getSubjectSkeletonSubjectID(req,res){

  try{
    let eval = await Regulation.aggregate(
      [{
       $unwind:"$Regulation"
     }
     ,
     {
       $unwind:"$Regulation.evaluationCriteria"
     }
     ,
     {
       $match:
       {
         "Institution_id":req.body.ins_id,
         "Regulation.Regulation_ID":req.body.reg_id,
         "Regulation.evaluationCriteria.subject_type":req.body.sub_type,
         
       }
     },
     {
       $project:{"Regulation.Grading":0, "Regulation.Department_Details":0}
     }
      ]);
      let finalRes = eval[0].Regulation.evaluationCriteria;
   return res.status(200).json({ msg: "Success", finalRes})
  }catch(e){
      return res.status(400).json({ msg: e });
  }

}

async function updateSubjectSkeletons(req, res) {
  var Errors = validationResult(req);
  if (!Errors.isEmpty()) {
    console.log("bad request");
    return res.status(400).json({ errors: Errors.errors });
  }

  try {
    const updatedSkeleton = await SubjectSkeletons.findOneAndUpdate({ subject_type: req.params.subject_type }, req.body,{
      new: true,
      upsert: true // Make this update into an upsert
    })
    return res.status(201).json({ msg: "Subject skeleton updated successfully", data: updatedSkeleton });;

  } catch (e) {
    return res.status(400).json({ msg: e });

  }
}




module.exports={
    createSubjectSkeletons,
    getSubjectSkeletonByDefaults,
    addSubjectSkeletonToInstitution,
    getSubjectSkeletonSubjectID,
    updateSubjectSkeletons
}