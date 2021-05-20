
const mongoose=require("mongoose")

const Department=new mongoose.Schema(  
  {
      Department_ID:
      {
        type:String,
        required:true,
        trim:true,
      },
      Department_Name:
      {
        type:String,
        required:true,
        trim:true,
      },
    
      Total_Credit:
      { 
        type:Number,
        required:true
      },
      Semester_Count:
      {
        type:Number,
        required:true
      },
      Credits_Details:
      {
        type:Array,
        required:true
    
      },
      Curriculum_Details:
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Curriculum'
      }
    });

const Department_Details=new mongoose.Schema({

Regulation_ID:
{
type:String,
required:true,
trim:true
},
Department_:[Department]

    } )
module.exports=mongoose.model("Department_Details",Department_Details);