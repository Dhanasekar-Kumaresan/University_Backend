const mongoose= require('mongoose')

const Schema= mongoose.Schema

const Course=new Schema({
    Course_id:{type:String, required:true,unique:true},
    Course_name:{type:String, required:false},
    Course_description:{type:String,required:false},
    AICTE_Reg_ID:{type:String, required:false},
    UGC_Reg_ID:{type:String, required:false},
    Course_type:{type:String, required:false},
    Course_duration:{type:String, required:false},
    Department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Department
    }
})

module.exports=mongoose.model('course',Course) 