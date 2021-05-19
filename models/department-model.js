const mongoose = require("mongoose");

const Departments= new mongoose.Schema({
    Department:[Department]
})
const Department = new mongoose.Schema({
  Department_name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Department_id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Seats:{
      type:Number, required:false
  },
  Course_id: {
    type:mongoose.Schema.Types.ObjectId, 
    ref:'institutions'
  },
});

module.exports = mongoose.model("Department", Departments);
