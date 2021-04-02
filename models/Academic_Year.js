const mongoDB=require("mongoose")



const Academic_Years_Schema=new mongoDB.Schema({
    Batch_ID:
    {
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    Batch_Name:{
        type:String,
        trim:true,
        required:true
    },
    curriculum_ID:
    {
        type:String,
        trim:true,
        required:true
    },
    Academic_year:
    {
        type:String,
        trim:true,
        required:true
    }
})
module.exports=mongoDB.model("Academic",Academic_Years_Schema)