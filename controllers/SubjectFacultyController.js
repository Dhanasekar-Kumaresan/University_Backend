const { validationResult } = require("express-validator");
const SubjectFaculty = require("../models/SubjectFaculty");

//Adding a faculty to a subject
exports.addFaculty = async function addFaculty(req, res) {
  var Errors = validationResult(req);
  if (!Errors.isEmpty()) {
    console.log("bad request");
    return res.status(400).json({ errors: Errors.errors });
  }

  let event = await SubjectFaculty.find({ $and: [{ institutionID: req.body.institutionID }, { courseID: req.body.courseID }, { semester: req.body.semester }, { academicYear: req.body.academicYear }] });
  if (event.length) {
    let eventDetails = req.body.eventDetails;
    let events = req.body.events;
    if (eventDetails == null || events == null) {
      return res.status(201).json({ msg: "Either eventDetails or events array is null. Please check the payload" });
    }
    let result = await SubjectFaculty.updateOne({ $and: [{ institutionID: req.body.institutionID }, { courseID: req.body.courseID }, { semester: req.body.semester }, { academicYear: req.body.academicYear }] },
      {
        $push:
        {
          eventDetails: eventDetails,
          events: events
        }
      });
    return res.status(201).json({ msg: "Added event and eventDetails successfully", result })

  }
  if (!event.length) {
    SubjectFaculty.create(req.body)
      .then((data) => {
        console.log("New event added!");
        return res.status(201).json({ msg: "Success", data: data });
      })
      .catch((e) => {
        console.log(e);
        return res.status(401).json({ msg: e });
      });
  }
}

exports.getCalendarEventDetails = (req, res) => {
  console.log(req.body.ins_id);
  SubjectFaculty.findOne({ $and: [{ institutionID: req.body.institutionID }, { courseID: req.body.courseID }, { semester: req.body.semester }, { academicYear: req.body.academicYear }] })
    .then((subjectFacultyDetails) => {
      // console.log(subjectFacultyDetails);
      return res.status(200).json(subjectFacultyDetails);
    }).catch((e) => {
      console.log(e);
      return res.status(500).json({ error: e });
    });
}
