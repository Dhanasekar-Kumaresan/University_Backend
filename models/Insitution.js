const mongoose=require("mongoose")

const Insitutions=new mongoose.Schema({
    Insitution_ID:
    {
        type:String,
        unique:true,
        required:true
    },
    Insitution_Name:
    {
        type:String,
        unique:true,
        required:true
    }
});
module.exports=mongoose.model("Insitutions",Insitutions);