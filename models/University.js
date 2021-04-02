const mongoose=require("mongoose")
const {Insitution}=require("./Insitution")
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
    Insitutions:[
        {type:mongoose.Schema.Types.ObjectID,ref:'Insitution.Instution_ID'}
    ]
 
})
module.exports=mongoose.model("University",University);