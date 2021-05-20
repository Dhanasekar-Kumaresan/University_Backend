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

const GradeSchema=new  mongoose.Schema({

GradeType:
{
  type:String,
  required:true,
  trim:true
},
RangeLow:
{
  type:Number,
  required:true
},
RangeHigh:
{
  type:Number,
  required:true
},
GradingDetails:
{
  type:Array,
  required:true
}
});



const Regulation_Schema=new mongoose.Schema(
{

Regulation_ID:{
    type:String,
    required:true,
    trim:true,
    unique:true
},
Regulation_Name:
{
    type:String,
    required:true,
    trim:true,
    unique:true
}
,
Academic_Year:
{
  type:Array,
  required:true,
},

Grading:
{
  type:GradeSchema,
  required:true
},
Department_Details:[Department]

}
);




module.exports=mongoose.model("Regulation",Regulation_Schema);

