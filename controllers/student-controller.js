const Student = require("../models/studentMaster-model")
var faker = require('faker');
const { contentSecurityPolicy } = require("helmet");
const Regulation = require("../models/Regulation");
const SubjectCtrller = require("./SubjectController");
const Subject = require("../models/Subject");
const SubjectSkeletons = require('../models/SubjectSkeletons');




const excel = require("exceljs");

async function getStudent(req, res) {
  try {
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
async function addStudent(req, res) {
  const body = req.body
  const fakeData = {}
  for (var i = 0; i < 10; i++) {
    fakeData.name = faker.name.findName()
    // var randomCard = faker.helpers.createCard()
    fakeData.student_id = "INC0" + faker.datatype.number()
    fakeData.Xpercent = Math.floor(Math.random() * (100 - 50)) + 50 + "%"
    fakeData.XIIpercent = Math.floor(Math.random() * (100 - 50)) + 50 + "%"
    fakeData.profilePic = faker.image.avatar();
    fakeData.course = "Medical"
    //console.log(fakeData);
    const studentData = new Student(fakeData)


    // if(!body){
    //     return res.status(200).json({
    //         success:false,
    //         message:'Need a valid input'
    //     })
    // }


    try {
      let student = await studentData.save();
      // if(student){
      //     return res.status(200).json({
      //         success:true,
      //         id:student.student_id,
      //         message:"Student Added Successfully",
      //     })
      // }
    }
    catch (err) {
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
      status: { $nin: ["approved", "onHold"] },
    });
    if (!student.length && student.length == 0) {
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
async function modifyStudent(req, res) {
  const body = req.body
  if (!body) {
    return res.status(200).json({
      success: false,
      message:
        "You must provide the Correct details to modify the Student Detail",
    });
  }
  try {
    let student = await Student.updateOne({ student_id: req.params.id },
      {
        $set: {
          status: body.status,
          //course:body.course
        },
      })
    if (student.ok) {
      return res.status(200).json({
        success: true,
        message: "Student Detail updated successfully!",
      });
    }
  }
  catch {
    return res.status(400).json({
      success: false,
      message:
        "Unknown error in updating Student details!!! Contact Admin",
    });
  }
}

//get all students based on institution type

async function getByInstitute(req, res) {
  try {
    let student = await Student.find({ institution_id: req.params.id, year: new Date().getFullYear() })
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

async function getByCourseType(req, res) {
  try {
    let student = await Student.find({ institution_id: req.params.id, year: new Date().getFullYear(), Course_type: req.params.Course_type })
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

async function getByCourseID(req, res) {
  try {
    let student = await Student.find({ institution_id: req.params.id, year: req.params.batch_year, Course_type: req.params.Course_type, Course_id: req.params.Course_id })
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

async function getStudentMarksForExcel(req, res) {
  try {
    let excelArray = [];
    let students = await Student.find({
      $and: [
        {
          Course_id: req.body.dep_id
        },
        {
          institution_id: req.body.ins_id
        },
        {
          Curriculum_Id: req.body.cur_id
        },
        {
          year: req.body.acad
        },
        {
          Regulation_Id: req.body.reg_id
        }
      ]
    });

    //console.log(students);
    let eval = await SubjectSkeletons.find({ patternId: req.body.patternId });
    let evalCriteria = eval[0];
    let semCheck, subCheck = false;

    if (students[1].marks.length == 0) {
      for (var j = 0; j < students.length; j++) {
        var obj = {
          studentName: students[j].name,
          studentID: students[j].student_id,
          key: function (n) {
            return this[Object.keys(this)[n]];
          }
        }
        for (var k = 0; k < evalCriteria.subject_contributors.length; k++) {
          obj[evalCriteria.subject_contributors[k].type_of_evaluation] = "";
        }
        excelArray.push(obj);

      }
    }
    if (students[0].marks.length > 0) {
      for (var j = 0; j < students.length; j++) {

        let semWise = students[j].marks;
        let semMarks, subMarks;

        for (let sem in semWise) {
          if (semWise[sem].semester == req.body.sem_no)
            semMarks = semWise[sem].subjectWise;
          semCheck = true;
        }
        if (semCheck) {
          for (let sub in semMarks) {
            if (semMarks[sub].Subject_ID == req.body.sub_code) {
              subMarks = semMarks[sub].Subject_Marks;
              subCheck = true;
            }
          }
        }
        var obj = {
          studentName: students[j].name,
          studentID: students[j].student_id,
        }
        for (var k = 0; k < evalCriteria.subject_contributors.length; k++) {
          if (subCheck) {
            obj[evalCriteria.subject_contributors[k].type_of_evaluation] = subMarks[evalCriteria.subject_contributors[k].type_of_evaluation];
          }
          if (!subCheck) {
            obj[evalCriteria.subject_contributors[k].type_of_evaluation] = "";
          }
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
      { header: "id", key: "studentID", width: 10 },
      { header: "name", key: "studentName", width: 25 }]
    for (var k = 0; k < evalCriteria.subject_contributors.length; k++) {
      columnArray.push({ header: evalCriteria.subject_contributors[k].type_of_evaluation, key: evalCriteria.subject_contributors[k].type_of_evaluation, width: 25 });
    }
    worksheet.columns = columnArray;
    // console.log(worksheet.columns);
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
  catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

async function updateStudentMarks(req, res) {
  var studentMarksData = req.body;
  let data = await Regulation.aggregate(
    [
      {
        $unwind: "$Regulation"
      }
      ,
      {
        $unwind: "$Regulation.Department_Details"
      }
      ,
      {
        $unwind: "$Regulation.Department_Details.Curriculum_Details"
      },
      {
        $unwind: "$Regulation.Department_Details.Curriculum_Details.Semester_Data"
      },
      {
        $unwind: "$Regulation.Department_Details.Curriculum_Details.Semester_Data.Subjects"
      },
      {
        $match: {
          "Institution_id": req.params.ins_id,
          "Regulation.Regulation_ID": req.params.reg_id,
          "Regulation.Department_Details.Department_ID": req.params.dep_id,
          "Regulation.Department_Details.Curriculum_Details.Curriclum_Code": req.params.cur_id,
          "Regulation.Department_Details.Curriculum_Details.Semester_Data.Semester_NO": parseInt(req.params.sem_id),
          "Regulation.Department_Details.Curriculum_Details.Semester_Data.Subjects.Subject_ID": req.params.sub_id
        }
      }
    ]);
    //console.log(data);
  const subject = data[0].Regulation.Department_Details.Curriculum_Details.Semester_Data.Subjects;
  let evall = await SubjectSkeletons.find({patternId: subject.patternId});
  let evalCriteria = evall[0];
  const subjectPayload = (({ Subject_ID, Subject_Name, Type }) => ({ Subject_ID, Subject_Name, Type }))(subject);
  subjectPayload.Subject_Grade = "";
  subjectPayload.Subject_Percent = "";
  subjectPayload.Subject_Pointer = "",
  subjectPayload.Subject_Marks = [];
  try {
    for (const record of studentMarksData) {
      const student = await Student.findOne({ student_id: record.id });
      //console.log(student);
      if (student) {
        var sem_f = false, sub_f = false, sub_marks_f = false;
        if (student.marks.length != 0) {
          var sem_data = (student.marks.filter(obj => { return obj.semester == req.params.sem_id }))
          if (sem_data[0]) {
            sem_f = true;
            if (sem_data[0].subjectWise.length != 0) {
              var sub_data = sem_data[0].subjectWise.filter(obj => { return obj.Subject_ID == req.params.sub_id })
              if (sub_data[0]) {
                sub_f = true;
              }
            }
          }
        }
        //console.log(sem_f,sub_f);  
        const { id, name, ...payload } = record;
        if (sem_f == false) {
          
          var studentSemDataupdate = await Student.findOneAndUpdate({ student_id: record.id },
            {
              $push: {
                marks: {
                  "semester": req.params.sem_id,
                  "sgpa": "",
                  "subjectWise": []
                }
              }
            })

          sem_f = true;
        }
        if (sem_f == true && sub_f == false) {
          
          var studentSubject = await Student.updateOne({ student_id: student.student_id, marks: { $elemMatch: { semester: req.params.sem_id } } },
            {
              $push: {
                'marks.$[i].subjectWise': subjectPayload
              }

            },
            {
              arrayFilters: [
                {
                  'i.semester': req.params.sem_id
                }
              ],
              upsert: true

            })
          sub_f = true;
        }
        var x = await Student.updateOne({ student_id: student.student_id, marks: { $elemMatch: { semester: req.params.sem_id, subjectWise: { $elemMatch: { Subject_ID: req.params.sub_id } } } } },
          {
            $set: {
              'marks.$[i].subjectWise.$[j].Subject_Marks': payload
            }

          }, {
          arrayFilters: [
            {
              'i.semester': req.params.sem_id
            },
            {
              'j.Subject_ID': req.params.sub_id
            }
          ],
          upsert: true

        })
        //working till here -- cheers!

      //console.log(evalCriteria.subject_contributors.length);
        if (typeof evalCriteria != 'undefined') {
          if (Object.keys(payload).length != evalCriteria.subject_contributors.length) {
            return res.status(400).json({ success: false, message: "specify exact number of subject coordinators" })
          }
          let marks_for_subjectGrade = 0;
          //Calculating the total marks got by the student for that subject -- good
          for (const key in payload) {
            if (payload.hasOwnProperty(key)) {
              const ec = evalCriteria.subject_contributors.filter(obj => { return obj.type_of_evaluation == `${key}` });
              if (`${payload[key]}` > ec[0].total_marks) {
                return res.status(400).json({ success: false, message: `${key} marks should be less than or equal to evaluation criteria marks` })

              }
              marks_for_subjectGrade += `${payload[key]}` * ec[0].individual_contribution / ec[0].total_marks;

            }
          }
          //good

          if (marks_for_subjectGrade <= evalCriteria.total_marks_subject) {
            var percent = marks_for_subjectGrade * 100 / evalCriteria.total_marks_subject;
            //console.log(percent);//

            var grade = await Regulation.aggregate([
              {
                $unwind: "$Regulation"
              },
              {
                $match: {
                  "Institution_id": req.params.ins_id,
                  "Regulation.Regulation_ID": req.params.reg_id,
                }
              }
            ])
            //Calculating grade from the regulation i.e AA -- 10,..etc
            var gradingCriteria = grade[0].Regulation.Grading.GradingDetails;
            //console.log(gradingCriteria.length);
            for (let i = 0; i < gradingCriteria.length; i++) {
              
              if(gradingCriteria[gradingCriteria.length - 1].percentage > percent){
                Subject_Grade = gradingCriteria[gradingCriteria.length - 1].grade;
                Subject_Pointer = gradingCriteria[gradingCriteria.length - 1].points;
                break;
              }
              if (gradingCriteria[i].percentage > percent) {
                continue;
              } 
                Subject_Grade = gradingCriteria[i].grade;
                Subject_Pointer = gradingCriteria[i].points;
                break;
              }
            //console.log(Subject_Grade,Subject_Pointer)
            var x = await Student.updateOne({ student_id: student.student_id, marks: { $elemMatch: { semester: req.params.sem_id, subjectWise: { $elemMatch: { Subject_ID: req.params.sub_id } } } } },
              {
                $set: {
                  'marks.$[i].subjectWise.$[j].Subject_Grade': Subject_Grade,
                  'marks.$[i].subjectWise.$[j].Subject_Percent': percent,
                  'marks.$[i].subjectWise.$[j].Subject_Pointer': Subject_Pointer

                }

              }, {
              arrayFilters: [
                {
                  'i.semester': req.params.sem_id
                },
                {
                  'j.Subject_ID': req.params.sub_id
                }
              ],
              upsert: true


            })
          } else {
            return res.status(400).json({ success: false, message: "total marks of subject exceed evaluation criteria" })
          }
        } else {
          return res.status(400).json({ success: false, message: "subject cordinators not specified for this subject" })

        }
      }
       else {
        return res.status(400).json({ success: false, message: "Student is not found" })

      }

    }
    return res.status(200).json({ success: true, message: "marks updated successfully" })


  } catch (e) {
    return res.status(400).json({ success: false, message: e.message })
  }
}

async function updateStudentSgpa(req, res) {

  var student = await Student.aggregate([
    {
      $unwind: "$marks"
    },
    {
      $match: {
        "student_id": req.params.stu_id,
        "marks.semester": req.params.sem_id,
      }
    }
  ])
  var sum = student[0].marks.subjectWise.reduce((n, { Subject_Pointer }) => n + Subject_Pointer, 0);
  var pointer = sum / student[0].marks.subjectWise.length;
  var x = await Student.updateOne({ student_id: req.params.stu_id, marks: { $elemMatch: { semester: req.params.sem_id } } },
    {
      $set: {
        'marks.$[i].sgpa': pointer,
      }

    }, {
    arrayFilters: [
      {
        'i.semester': req.params.sem_id
      }
    ],
    upsert: true
  })
  return res.status(200).json({ success: true, message: "updated sgpa succesfully" })
}


async function getStudentMarksForCourse(req, res) {
  try {
    let result = [];
    let students = await Student.find({
      $and: [
        {
          Course_id: req.body.dep_id
        },
        {
          institution_id: req.body.ins_id
        },
        {
          Curriculum_Id: req.body.cur_id
        },
        {
          year: req.body.acad
        },
        {
          Regulation_Id: req.body.reg_id
        }
      ]
    });
    if (!students) {
      return res
        .status(200)
        .json({ success: false, message: `Student entry not found` })
    }
    for (var stud in students) {
      let obj = [];
      let semsData = students[stud].marks;
      for(sem in semsData){
        if(semsData[sem].semester == req.body.sem_no){
          obj = semsData[sem].subjectWise;
        }
      }
      console.log(obj);
      if(!obj.length){
        result.push({student_id: students[stud].student_id, msg: "Data not found for this student"});
      }else{
        result.push({student_id: students[stud].student_id, data: obj})

      }
    }
    return res.status(201).json(result);
    
  }
  catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}


async function getStudentMarksForSubject(req, res) {
  try {
    let result = [];
    let students = await Student.find({
      $and: [
        {
          Course_id: req.body.dep_id
        },
        {
          institution_id: req.body.ins_id
        },
        {
          Curriculum_Id: req.body.cur_id
        },
        {
          year: req.body.acad
        },
        {
          Regulation_Id: req.body.reg_id
        }
      ]
    });
    if (!students) {
      return res
        .status(200)
        .json({ success: false, message: `Student entry not found` })
    }
    for (var stud in students) {
      let obj = [];
      let subData;
      let semCheck = false;
      let semsData = students[stud].marks;
      for(sem in semsData){
        if(semsData[sem].semester == req.body.sem_no){
          obj = semsData[sem].subjectWise;
          semCheck = true;
        }
      }
      if(semCheck){
        for(sub in obj){
          if(obj[sub].Subject_ID == req.body.sub_code){
            subData = obj[sub].Subject_Marks;
          }
        }
      }
      console.log(subData);
      if(subData == undefined){
        result.push({student_id: students[stud].student_id, msg: "Data not found for this student"});
      }else{
        result.push({student_id: students[stud].student_id, data: subData})

      }
    }
    return res.status(201).json(result);
    
  }
  catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}
module.exports = {
  getStudent,
  addStudent,
  searchStudentName,
  modifyStudent,
  getByInstitute,
  getByCourseType,
  getByStudentStatus,
  getStudentMarksForExcel,
  updateStudentMarks,
  updateStudentSgpa,
  getByCourseID,
  getStudentMarksForCourse,
  getStudentMarksForSubject
}