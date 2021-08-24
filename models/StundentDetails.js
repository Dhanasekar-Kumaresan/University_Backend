const { setLocale } = require("faker")
const mongoDB=require("mongoose")




const Year=new mongoDB.Schema({
    Batch_Year:
    {
        type:Array,
        required:true
    },
    Student_List:
    {
        type:Array,
        required:true
    }

})


const Course=new mongoDB.Schema({



    Course_id:
    {
        type:String,
        unique:true,
        required:true
    },
    years:[Year]
})


const student=new mongoDB.Schema({

    Institution_id:
    {
        type:String,
        required:true,
        unique:true
    },
    Courses:[Course]

})

module.exports=mongoDB.model("studentData",student);





