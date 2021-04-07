const mongoose=require("mongoose")


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


}
)

module.exports=mongoose.model("Regulation",Regulation_Schema);