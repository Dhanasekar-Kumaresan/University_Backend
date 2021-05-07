const mongoose=require("mongoose")
const {Institution}=require("./Institution")
const University=new mongoose.Schema({
    University_ID:
    {
        type:String,
        unique:true,
        required:true
    },
    University_Name:
    {
        type:String,
        unique:true,
        required:true
    },
    Institutions:[
        {type:mongoose.Schema.Types.ObjectID,ref:'Institution.INSTITUTION_ID'}
    ]
 
})
module.exports=mongoose.model("University",University);