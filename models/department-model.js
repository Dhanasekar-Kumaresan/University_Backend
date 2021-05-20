const mongoose = require("mongoose");


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
  }
});
const Departments= new mongoose.Schema({
  Course_id: {
    type:mongoose.Schema.Types.ObjectId, 
    ref:'institutions'
  },
  Department:[Department]
})
module.exports = mongoose.model("Department", Departments);
