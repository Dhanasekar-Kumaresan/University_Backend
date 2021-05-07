const mongoose=require("mongoose")

const Course = new mongoose.Schema({
    COURSE_ID:
    {
        type:String,
        unique:true,
        required:true
    },
    COURSE_NAME:
    {
        type:String,
        required:true
    },
    COURSE_DURATION:
    {
        type:String,
        required:true
    },
    COURSE_SEMESTERS:
    {
        type:String,
        required:true
    },
    
    INSTITUTION_ID:{

        type:String,
        required:true
      }
});
module.exports=mongoose.model("Course",Course);