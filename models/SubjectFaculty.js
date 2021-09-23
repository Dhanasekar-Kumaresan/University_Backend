const mongoose=require("mongoose")


const eventDetails=new mongoose.Schema({

    eventID:
    {
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    facultyID:
    {
        type:String
    },
    facultyName:
    {
        type:String
    },
    subject_code:
    {
        type:String
    },
    subject_name:
    {
        type:String
    },
    start:
    {
        type:Date,
        required:true
    },
    end:
    {
        type:Date,
        required:true
    },
    venue:
    {
        type:String
    }
    });

    const events=new mongoose.Schema({

        title:
        {
            type:String,
            required:true
        },
        start:
        {
            type:Date,
            required:true
        },
        end:
        {
            type:Date,
            required:true
        }
        });

const SubjectFaculty = new mongoose.Schema({
    courseID:
    {
        type:String,
        required:true
    },    
    institutionID:{

        type:String,
        required:true
    },
    semester:{
        type:String,
        required:true
    },
    academicYear:{
        type:String,
        required:true
    },  
    eventDetails: [eventDetails],
    events: [events]


});
module.exports=mongoose.model("subjectFaculty",SubjectFaculty);