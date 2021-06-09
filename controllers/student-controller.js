const Student= require("../models/studentMaster-model")
var faker = require('faker');
const { contentSecurityPolicy } = require("helmet");
const Regulation = require("../models/Regulation");



const excel = require("exceljs");

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

async function getStudentMarks(req, res) {
  try {
    let excelArray = [];
      let students = await Student.find({
        $and: [
          {
            course_id: req.body.cor_id
          },
          {
            college_id: req.body.ins_id
          },
          {
            semester_no: req.body.sem_no
          },
          {
            academicYear: req.body.acad
          }
        ]
      });

      console.log(students);
      let eval = await Regulation.aggregate(
        [{
         $unwind:"$Regulation"
       }
       ,
       {
         $unwind:"$Regulation.evaluationCriteria"
       }
       ,
       {
         $match:
         {
           "Institution_id":req.body.ins_id,
           "Regulation.Regulation_ID":req.body.reg_id,
           "Regulation.evaluationCriteria.subject_type":req.body.sub_type,
           
         }
       },
       {
         $project:{"Regulation.Grading":0, "Regulation.Department_Details":0}
       }
        ]
       );
       
      
      let evalCriteria = eval[0].Regulation.evaluationCriteria;
        
      console.log(evalCriteria);
      if(students[0].marks.length == 0){
        for(var j = 0; j<students.length; j++){
          var obj = {
            studentName: students[j].name,
            studentID: students[j].student_id,
            key: function(n) {
              return this[Object.keys(this)[n]];
          }
          }
          for(var k=0; k<evalCriteria.subject_contributors.length; k++){
            obj[evalCriteria.subject_contributors[k].type_of_evaluation] = "";
          }
          excelArray.push(obj);

        }
      }
      
      
      if (!students) {
          return res
              .status(200)
              .json({ success: false, message: `Student entry not found` })
      }

      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("excelArray");
  
      let columnArray = [
        { header: "ID", key: "studentID", width: 10 },
        { header: "NAME", key: "studentName", width: 25 }]
        for(var k = 0; k<evalCriteria.subject_contributors.length; k++){
          columnArray.push({ header: evalCriteria.subject_contributors[k].type_of_evaluation, key: evalCriteria.subject_contributors[k].type_of_evaluation, width: 25 });
      }
      worksheet.columns = columnArray;
          console.log(worksheet.columns);
      // Add Array Rows
      worksheet.addRows(excelArray);
  
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "marksData.xlsx"
      );
      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });

      //return res.status(200).json({ success: true, data: excelArray})
  }
  catch(error) {
      return res.status(400).json({ success: false, message: error.message })
  }
}


module.exports={
    getStudent,
    addStudent,
    searchStudentName,
    modifyStudent,
    getByStudentCourse,
    getByStudentStatus,
    getStudentMarks,
}