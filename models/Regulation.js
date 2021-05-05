const mongoose=require("mongoose")

const Department_Details=new mongoose.Schema(
  {
    Department_ID:
    {
      type:String,
      required:true,
      trim:true,
      unique:true
    },
    Department_Name:
    {
      type:String,
      required:true,
      trim:true
    },
  
    total_Credit:
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
  
    }
  }
  );


const Regulation_Schema=new mongoose.Schema(
{

Regulation_ID:{
    type:String,
    required:true,
    unique:true,
    trim:true
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
}
,
Department_Details:[Department_Details]

}
);




module.exports=mongoose.model("Regulation",Regulation_Schema);

