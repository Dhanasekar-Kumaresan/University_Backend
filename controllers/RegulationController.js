const { validationResult } = require("express-validator");
const Regulation = require("../models/Regulation");

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
