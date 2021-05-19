const mongoose= require('mongoose')
const universityModel = require('./university-model')

const Schema= mongoose.Schema

const Institutions=new Schema({
    
    Institution_id:{type:String, required:true,unique:true},
    Institution_name:{type:String, required:false},
    Institution_strength:{type:String, required:false},
    AICTE_Reg_ID:{type:String, required:false},
    UGC_Reg_ID:{type:String, required:false},
    Institution_description:{type:String, required:false},
    Institution_type:{type:String, required:false},
    Institution_established:{type:Date, required:false},
    ownershipType:{type:String, required:false},
    hideCarousel:{type:Boolean,required:false},
    showRounds:{type:Boolean,required:false},
    courseDetails:[{
        Course_id:{type:String, required:true,unique:true},
        Course_name:{type:String, required:false},
        Course_description:{type:String,required:false},
        AICTE_Reg_ID:{type:String, required:false},
        UGC_Reg_ID:{type:String, required:false},
        Course_type:{type:String, required:false},
        Course_duration:{type:String, required:false},
    }],
    University_id:{type:mongoose.Schema.Types.ObjectId, ref:'university'}
})

module.exports=mongoose.model("institutions",Institutions)  