const mongoose= require('mongoose')

const Schema= mongoose.Schema

const Student=new Schema({
    student_id:{type:String, required:true,unique:true},
    name:{type:String, required:false},
    status:{type:Boolean, required:false},
    rank:{type:Number, required:false},
    Xpercent:{type:String, required:false},
    XIIpercent:{type:String, required:false},
    category:{type:String, required:false},
    profilePic:{type:String, required:false},
    course_id:{type:String ,required:false},
    college_id:{type:String, required:false},
    status:{type:String, required:false},
    course:{type:String,required:false},
    marks:{type:Array},
    CGPA: {type: String},
    semester_no:{type:String,required:false},
    academicYear:{type:String,required:false}
})

module.exports=mongoose.model('student',Student) 