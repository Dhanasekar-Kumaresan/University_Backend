const SubjectSkeletons = require('../models/SubjectSkeletons')
const Regulation = require("../models/Regulation");
const { validationResult } = require("express-validator");

async function createSubjectSkeletons(req, res) {
  var Errors = validationResult(req);
  if (!Errors.isEmpty()) {
    console.log("bad request");
    return res.status(400).json({ errors: Errors.errors });
  }
  const subjectSkeletons = new SubjectSkeletons(req.body);
  try {
    await subjectSkeletons.save();
    return res.status(201).json({ msg: "Success", data: subjectSkeletons });;
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
}

async function getSubjectSkeletonByDefaults(res, res) {

  try {
    const skeletons = await SubjectSkeletons.find({});
    return res.status(200).json({ msg: "Success", data: skeletons })
  } catch (e) {
    return res.status(400).json({ msg: e });
  }

}

async function addSubjectSkeletonToInstitution(req, res) {
  var institution = req.params.ins_id;
  var regulation = req.params.reg_id;
  try {
    await Regulation.updateOne(
      {
        Institution_id: institution,
        Regulation: { $elemMatch: { Regulation_ID: regulation } }
      },
      {
        $push:
        {
          "Regulation.$.evaluationCriteria": req.body
        }
      })
    return res.status(200).json({ success: true });
  }
  catch (err) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
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


module.exports = {
  createSubjectSkeletons,
  getSubjectSkeletonByDefaults,
  addSubjectSkeletonToInstitution,
  updateSubjectSkeletons
}