const mongoose=require("mongoose")

const Department=new mongoose.Schema(
    {
        DEPARTMENT_NAME:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        DEPARTMENT_ID:
        {
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        INSTITUTION_ID:{
            type:String,
            required:true
          },
        COURSE_ID:{
            type:String,
            required:true
          }
    }
);

module.exports=mongoose.model("Department",Department);