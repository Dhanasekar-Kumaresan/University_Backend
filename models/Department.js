const mongoose=require("mongoose")

const Department=new mongoose.Schema(
    {
        Department_Name:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        Department_ID:
        {
            type:String,
            required:true,
            trim:true,
            unique:true
        }
    }
);

module.exports=mongoose.model("Department",Department);