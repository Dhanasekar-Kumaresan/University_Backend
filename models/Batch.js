const mongoose=require("mongoose")


const Batch=new mongoose.Schema(
{
Batch_ID:{
    type:String,
    required:true,
    unique:true,
    trim:true
},
Batch_Name:
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
Regulation_ID:{
    type:String, 
    required:true,
    trim:true
}

}
)

module.exports=mongoose.model("Batch",Batch);