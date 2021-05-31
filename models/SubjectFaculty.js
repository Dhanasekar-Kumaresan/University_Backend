const mongoose=require("mongoose")

const SubjectFaculty = new mongoose.Schema({
    facultyID:
    {
        type:String,
        required:true
    },
    facultyName:
    {
        type:String,
        required:true
    },
    departmentID:
    {
        type:String,
        required:true
    },
    courseID:
    {
        type:String,
        required:true
    },    
    institutionID:{

        type:String,
        required:true
    },
    semesterID:{
        type:String,
        required:true
    },
    marksSubmissionStatus:{
        type:String,
        required:true
    },  
    subjectID:{
        type:String,
        required:true
    },
    subjectType:{
        type:String,
        required:true
    },
    academicYear:{
        type:String,
        required:true
    },
    downloadFlag:{
        type:String,
        default: 'true'
    },  
    enrolledStudents: []


});
module.exports=mongoose.model("subjectFaculty",SubjectFaculty);