const mongoose=require("mongoose")

const Institution=new mongoose.Schema({
    INSTITUTION_ID:
    {
        type:String,
        unique:true,
        required:true
    },
    INSTITUTION_NAME:
    {
        type:String,
        required:true
    },
    
    UNIVERSITY_ID:{

        type: mongoose.Schema.Types.ObjectId,
        ref: "University"
      }
});
module.exports=mongoose.model("Institution",Institution);