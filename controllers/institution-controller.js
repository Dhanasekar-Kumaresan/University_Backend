const Institution = require("../models/institution-model");
const University = require("../models/university-model");

async function getInstitution(req, res) {
  try {
    let institution = await Institution.find({});
    if (!institution.length) {
      return res
        .status(200)
        .json({ success: false, message: `Institution not found` });
    }
    return res.status(200).json({ success: true, data: institution });
  } catch {
    return res.status(400).json({
      success: false,
      message: "Unknown error in fetching Institution!!! Contact Admin",
    });
  }
}
async function addInstitution(req, res) {
  let body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      message: "Need a valid input",
    });
  }

  try {
    let university = await University.findOne({
      University_id: body.University_id,
    });

    body.University_id = university._id;

    let institution_body = new Institution(body);

    let institution = await institution_body.save();

    if (institution) {
      return res
        .status(200)
        .json({
          success: true,
          id: institution.Institution_id,
          message: "Institution Added Successfully",
        });
    }
  } catch (err) {
    if (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        return res
          .status(422)
          .send({ succes: false, message: "Institution already exist!" });
      }
      return res.status(422).send(err);
    }
  }
}
module.exports = {
  getInstitution,
  addInstitution,
};
