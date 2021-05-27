const SubjectSkeletons = require('../models/SubjectSkeletons')
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

async function getSubjectSkeletonByDefaults(res,res){

    try{
     const skeletons = await SubjectSkeletons.find({});
     return res.status(200).json({ msg: "Success", data: skeletons })
    }catch(e){
        return res.status(400).json({ msg: e });
    }

}



module.exports={
    createSubjectSkeletons,
    getSubjectSkeletonByDefaults
}