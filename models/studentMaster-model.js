const mongoose= require('mongoose')

const Schema= mongoose.Schema

const Student=new Schema({
    student_id:{type:String, required:true,unique:true},
    name:{type:String, required:false},
    rank:{type:Number, required:false},
    Xpercent:{type:Number, required:false},
    XIIpercent:{type:Number, required:false},
    category:{type:String, required:false},
    profilePic:{type:String, required:false},
    priority:{type:Array},
    institution_id:{type:String, required:false},
    status:{type:String, required:false},
    marks:{type:Array},
    CGPA: {type: String},
    semester_no:{type:String,required:false},
    academicYear:{type:String,required:false},
    Quota:{type:String, required:false},
    Course_type:{type:String, required:false},
    Course_id:{type:String, required:false},
    allocation_status:{type:String , required:false},
    year:{type:Number ,required:false}

})

module.exports=mongoose.model('student',Student) 