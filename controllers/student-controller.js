const Student = require("../models/studentMaster-model")
var faker = require('faker');
const { contentSecurityPolicy } = require("helmet");
const Regulation = require("../models/Regulation");
const SubjectCtrller = require("./SubjectController");
const Subject = require("../models/Subject");




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
    let student = await Student.find({ institution_id: req.params.id, year:new Date().getFullYear() })
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
    let student = await Student.find({ institution_id: req.params.id, year:new Date().getFullYear() ,Course_type :req.params. Course_type })
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
    let student = await Student.find({ institution_id: req.params.id, year:new Date().getFullYear() ,Course_type :req.params.Course_type , Course_id:req.params.Course_id })
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
          course_id: req.body.dep_id
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
            "Institution_id": req.body.ins_id,
            "Regulation.Regulation_ID": req.body.reg_id,
            "Regulation.Department_Details.Department_ID": req.body.dep_id,
            "Regulation.Department_Details.Curriculum_Details.Curriclum_Code": req.body.cur_no,
            "Regulation.Department_Details.Curriculum_Details.Semester_Data.Semester_NO": parseInt(req.body.sem_no),
            "Regulation.Department_Details.Curriculum_Details.Semester_Data.Subjects.Subject_Code": req.body.sub_code
          }
        }


      ]);


    let evalCriteria = eval[0].Regulation.Department_Details.Curriculum_Details.Semester_Data.Subjects.evalCriteria;

    //console.log(evalCriteria);
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
          "Regulation.Department_Details.Curriculum_Details.Semester_Data.Subjects.Subject_Code": req.params.sub_id
        }
      }


    ])
  const subject = data[0].Regulation.Department_Details.Curriculum_Details.Semester_Data.Subjects;
  const evalCriteria = subject.evalCriteria;
  const subjectPayload = (({ Subject_Code, Subject_Name, Type }) => ({ Subject_Code, Subject_Name, Type }))(subject);
  subjectPayload.Subject_Grade = "";
  subjectPayload.Subject_Percent = "";
  subjectPayload.Subject_Pointer = "",
    subjectPayload.Subject_Marks = [];
  try {

    for (const record of studentMarksData) {
      // const student = await Student.findOne({ college_id: req.params.ins_id, course_id: req.params.dep_id, student_id: record.id });
      const student = await Student.findOne({ student_id: record.id });
      if (student) {
        var sem_f = false, sub_f = false, sub_marks_f = false;
        if (student.marks.length != 0) {
          var sem_data = (student.marks.filter(obj => { return obj.semester == req.params.sem_id }))
          if (sem_data[0]) {
            sem_f = true;
            if (sem_data[0].subjectWise.length != 0) {
              var sub_data = sem_data[0].subjectWise.filter(obj => { return obj.Subject_Code == req.params.sub_id })
              if (sub_data[0]) {
                sub_f = true;
              }
            }
          }
        }
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
        var x = await Student.updateOne({ student_id: student.student_id, marks: { $elemMatch: { semester: req.params.sem_id, subjectWise: { $elemMatch: { Subject_Code: req.params.sub_id } } } } },
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
              'j.Subject_Code': req.params.sub_id
            }
          ],
          upsert: true

        })
        if (typeof evalCriteria != 'undefined') {
          if (Object.keys(payload).length != evalCriteria.subject_contributors.length) {
            return res.status(400).json({ success: false, message: "specify exact number of subject coordinators" })
          }
          let marks_for_subjectGrade = 0;
          for (const key in payload) {
            if (payload.hasOwnProperty(key)) {
              const ec = evalCriteria.subject_contributors.filter(obj => { return obj.type_of_evaluation == `${key}` });
              if (`${payload[key]}` > ec[0].total_marks) {
                return res.status(400).json({ success: false, message: `${key} marks should be less than or equal to evaluation criteria marks` })

              }
              marks_for_subjectGrade += `${payload[key]}` * ec[0].individual_contribution / ec[0].total_marks;

            }
          }
          if (marks_for_subjectGrade <= evalCriteria.total_marks_subject) {
            var percent = marks_for_subjectGrade * 100 / evalCriteria.total_marks_subject;
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
            var gradingCriteria = grade[0].Regulation.Grading.GradingDetails;
            console.log("grading crteria is ", gradingCriteria);
            for (let i = 0; i < gradingCriteria.length; i++) {
              if ((gradingCriteria[i].percentage > percent) && ((i + 1) <= gradingCriteria.length) && (percent >= gradingCriteria[i + 1].percentage)) {
                Subject_Grade = gradingCriteria[i + 1].grade;
                Subject_Pointer = gradingCriteria[i + 1].point;
                break;
              } else if (percent >= gradingCriteria[i].percentage) {
                Subject_Grade = gradingCriteria[i].grade;
                Subject_Pointer = gradingCriteria[i].point;
                break;
              } else {
                Subject_Grade = 'B';
                Subject_Pointer = '6';
              }
            }
            var x = await Student.updateOne({ student_id: student.student_id, marks: { $elemMatch: { semester: req.params.sem_id, subjectWise: { $elemMatch: { Subject_Code: req.params.sub_id } } } } },
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
                  'j.Subject_Code': req.params.sub_id
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
      } else {
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

module.exports = {
  getStudent,
  addStudent,
  searchStudentName,
  modifyStudent,
  getByInstitute,
  getByCourseType,
  getByStudentStatus,
  getStudentMarks,
  updateStudentMarks,
  updateStudentSgpa,
  getByCourseID
}