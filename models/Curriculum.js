const { Schema } = require("mongoose")
const mongoose=require("mongoose")


const Subject=new mongoose.Schema({
Subject_Code:
{
    type:String,
    trim:true,
    required:true,
    unique:true
},
Type:
{
    type:String,
    trim:true,
    required:true
},
Subject_Name:
{
    type:String,
    trim:true,
    required:true
},
Description:
{
    type:String,
    trim:true,
    required:true
},
Credits:
{
    type:Number,
    trim:true,
    required:true
},
Group_Name:
{ 
    type:String,
    trim:true
}

})

const Semester_Details=new mongoose.Schema({

Semester_NO:
{
    type:Number,
    trim:true,
    required:true,
    unique:true
},
Subjects:[Subject]



})


const Curriculum=new mongoose.Schema({


Curriclum_Code:
{
    type:String,
    trim:true,
    required:true
},
Curriculum_Name:
{
    type:String,
    trim:true,
    required:true
},
Batch_Year:
{
    type:Number,
    trim:true,
    required:true
},
Department_ID:
{
    type:String,
    trim:true,
    required:true
},
Semester_Data:[Semester_Details]

})

module.exports=mongoose.model("Curriculum",Curriculum);