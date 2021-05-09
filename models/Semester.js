const mongoose=require("mongoose")

const Semester = new mongoose.Schema({
    SEMESTER_ID:
    {
        type:String,
        unique:true,
        required:true
    },
    DEPARTMENT_ID:
    {
        type:String,
        required:true
    },
    COURSE_ID:
    {
        type:String,
        required:true
    },    
    INSTITUTION_ID:{

        type:String,
        required:true
      },
      SUBJECTS: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject"
        }
      ]
  

});
module.exports=mongoose.model("Semester",Semester);