const mongoose=require("mongoose")


const Subject=new mongoose.Schema(
    {
        _id:
        {
                Subject_ID:
                {
                    type:String,
                    required:true,
                    trim:true, 
                },
                Department_ID:
        {
            type:String,
            required:true,
            trim:true,
        }

        },
        Subject_ID:
        {
            type:String,
            required:true,
            trim:true,   
        },
        Subject_Name:
        {
            type:String,
            required:true,
            trim:true,
        },
        isActive:
        {
            type:Boolean,
            required:true,

        },
        Type:
        {
            type:String,
            required:true,
            trim:true
        },
        Department_ID:
        {
            type:String,
            required:true,
            trim:true
        }
    }
);

module.exports=mongoose.model("Subject",Subject);