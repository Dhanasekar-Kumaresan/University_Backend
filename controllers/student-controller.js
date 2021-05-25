const Student= require("../models/studentMaster-model")
var faker = require('faker');
const { contentSecurityPolicy } = require("helmet");

async function getStudent(req,res){
    try{
        let student = await Student.find({})
        if (!student.length) {
            return res
                .status(200)
                .json({ success: false, message: `Student not found` })
        }
        return res.status(200).json({ success: true, data: student })
    }
    catch {
        return res.status(400).json({ success: false, message: "Unknown error in fetching Student details!!! Contact Admin" })
    }
}
async function addStudent(req,res){
    const body= req.body
    const fakeData={}
    for(var i=0;i<10;i++){
         fakeData.name = faker.name.findName()
        // var randomCard = faker.helpers.createCard()
        fakeData.student_id="INC0"+faker.datatype.number()
        fakeData.Xpercent=Math.floor(Math.random() * (100 - 50)) + 50 +"%"
        fakeData.XIIpercent=Math.floor(Math.random() * (100 - 50)) + 50 +"%"
        fakeData.profilePic=faker.image.avatar();
        fakeData.course="Medical"
        //console.log(fakeData);
        const studentData=new Student(fakeData)
       
    
    // if(!body){
    //     return res.status(200).json({
    //         success:false,
    //         message:'Need a valid input'
    //     })
    // }
    
    
    try{
        let student= await studentData.save();
        // if(student){
        //     return res.status(200).json({
        //         success:true,
        //         id:student.student_id,
        //         message:"Student Added Successfully",
        //     })
        // }
    }
    catch(err){
        // if (err) {
        //     if (err.name === 'MongoError' && err.code === 11000) {
        //       return res.status(422).send({ succes: false, message: 'Student already exist!' });
        //     }
        //     return res.status(422).send(err);
        // }
    }
}
}

async function searchStudentName(req, res) {
    try {
      let student = await Student.find({
        name: new RegExp(req.params.text, "i"),
        status :{$nin:["approved" , "onHold"] },
      });
      if (!student.length && student.length==0) {
        return res
          .status(200)
          .json({ success: false, message: `Student not found` });
      }
      let result = [];
      for (var i = 0; i < student.length; i++) {
        // if (student[i].name.indexOf(req.params.text) != -1) {
        //   result.push(student[i]);
        // }
        result.push(student[i]);
        
      }
      return res.status(200).json({ success: true, data: result });
    } catch {
      return res
        .status(400)
        .json({
          success: false,
          message: "Unknown Error while Searching Student Please Contact Admin",
        });
    }
  }
async function modifyStudent(req,res){
  const body=req.body
  if(!body){
    return res.status(200).json({
      success: false,
      message:
        "You must provide the Correct details to modify the Student Detail",
    });
  }
  try{
    let student=await Student.updateOne({student_id:req.params.id},
      {
        $set:{
         status:body.status,
          //course:body.course
        },
      })
      if(student.ok){
        return res.status(200).json({
          success: true,
          message: "Student Detail updated successfully!",
        });
      }
  }
  
  catch{
    return res.status(400).json({
      success: false,
      message:
        "Unknown error in updating Student details!!! Contact Admin",
    });
  }
}
async function getByStudentCourse(req, res) {
  try {
      let student = await Student.find({ course: req.params.id })
      if (!student) {
          return res
              .status(200)
              .json({ success: false, message: `Student entry not found` })
      }
      return res.status(200).json({ success: true, data: student })
  }
  catch {
      return res.status(400).json({ success: false, message: "unknown Error in fetching Student detail!! Please Contact admin" })
  }
}

async function getByStudentStatus(req, res) {
  try {
      let student = await Student.find({ status: req.params.id })
      if (!student) {
          return res
              .status(200)
              .json({ success: false, message: `Student entry not found` })
      }
      return res.status(200).json({ success: true, data: student })
  }
  catch {
      return res.status(400).json({ success: false, message: "unknown Error in fetching Student detail!! Please Contact admin" })
  }
}
module.exports={
    getStudent,
    addStudent,
    searchStudentName,
    modifyStudent,
    getByStudentCourse,
    getByStudentStatus
}