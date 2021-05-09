const mongoose= require('mongoose')

const Schema= mongoose.Schema

const University=new Schema({
    Institution_id:{type:String, required:true,unique:true},
    Institution_name:{type:String, required:false},
    Institution_type:{type:String, required:false},
    Description:{type:String, required:false},
    collegeDetails:[{
        college_id:{type:String, required:false}
    }]
})

module.exports=mongoose.model('university',University) 