const mongoose= require('mongoose')

const Schema= mongoose.Schema

const University=new Schema({
    University_id:{type:String, required:true,unique:true},
    University_name:{type:String, required:false},
    University_type:{type:String, required:false},
    University_description:{type:String, required:false},
})

module.exports=mongoose.model('university',University)   