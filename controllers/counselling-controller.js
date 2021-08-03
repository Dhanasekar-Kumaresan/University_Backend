const Student = require("../models/studentMaster-model");
const Institution = require("../models/institution-model");
var faker = require("faker");
const { contentSecurityPolicy } = require("helmet");
const { fake } = require("faker");

async function getStudent(req, res) {
  try {
    let student = await Student.find({});
    if (!student.length) {
      return res
        .status(200)
        .json({ success: false, message: `Student not found` });
    }
    return res.status(200).json({ success: true, data: student });
  } catch {
    return res.status(400).json({
      success: false,
      message: "Unknown error in fetching Student details!!! Contact Admin",
    });
  }
}

async function addStudent(req, res) {
  const body = req.body;
  const quota = [];
  const Quota = [];
  let list = [];
  const fakeData = {};
  const course = await Institution.find({ Institution_id: req.params.id });
  if (!course.length) {
    return res
      .status(200)
      .json({ success: false, message: `Institute not found` });
  }
  //console.log("Course", courseDetails[0].courseDetails)
  course.forEach((element) => {
    console.log(element.courseDetails.length);
    for (let i = 0; i < element.courseDetails.length; i++) {
      if (element.courseDetails[i].Course_type == req.params.course_type) {
        list.push({
          Course_id: element.courseDetails[i].Course_id,
          Course_name: element.courseDetails[i].Course_name,
        });
        quota.push(element.courseDetails[i].Quotas);
      }
    }
  });

  if (quota.length == 0) {
    return res.status(400).json({ msg: "Please add Quota for the Course" });
  }
  for (var j = 0; j < quota.length; j++) {
    for (var i = 0; i < quota[j].length; i++) {
      Quota.push(quota[j][i].Quota_name);
    }
    break;
  }
  for (var i = 0; i < 25; i++) {
    fakeData.priority = [];
    //Hardcode the priority course length
    while (fakeData.priority.length != quota.length) {
      var Priority_course = list[Math.floor(Math.random() * list.length)];
      if (!fakeData.priority.includes(Priority_course)) {
        //console.log(Priority_course)
        fakeData.priority.push(Priority_course);
      }
    }

    fakeData.Quota = Quota[Math.floor(Math.random() * Quota.length)];
    fakeData.name = faker.name.findName();
    fakeData.student_id = "TEMP_M" + faker.datatype.number();
    fakeData.Xpercent = Math.floor(Math.random() * (100 - 50)) + 50;
    fakeData.XIIpercent = Math.floor(Math.random() * (100 - 50)) + 50;
    fakeData.profilePic = faker.image.avatar();
    fakeData.institution_id = req.params.id;
    fakeData.Course_type = req.params.course_type;
    fakeData.status = "approved";

    // fakeData.rank= Math.floor(Math.random() * (10000 - 999)) + 999 ;
    //console.log("Data" , fakeData);
    const studentData = new Student(fakeData);
    console.log("Data", studentData);
    let student = await studentData.save();
    console.log("Done", i);
  }
  return res.status(200).json({ msg: "Students added successfully" });
}

async function rankCalculation(req, res) {
  // const body = req.body;
  //console.log(body)
  const student = await Student.find({
    institution_id: req.params.id,
    status: "approved",
    Course_type: "Mtech",
  });
  // console.log(student.length)

  var rank = {};
  for (var i = 0; i < student.length; i++) {
    while (!(randomRank in rank)) {
      randomRank = Math.floor(Math.random() * student.length + 1);
      if (!(randomRank in rank)) {
        rank[randomRank] = student[i].student_id;
      } else {
        randomRank = undefined;
      }
    }
    var randomRank = undefined;
  }
  // console.log(rank);
  seatMatrix = {};
  const course = await Institution.find({ Institution_id: req.params.id });
  course.forEach((element) => {
    for (let i = 0; i < element.courseDetails.length; i++) {
      if (element.courseDetails[i].Course_type == "Mtech") {
        seatMatrix[element.courseDetails[i].Course_id] =
          element.courseDetails[i].Quotas;
      }
    }
  });
  console.log(seatMatrix);
  for (const students in rank) {
    var flag = false;
    let student_id = rank[students];
    const result = student.filter(
      (element) => element.student_id == student_id
    );
    var len = result[0].priority.length;
    for (var i = 0; i < len; i++) {
      var Course_details = result[0].priority[i];
      var Quota_details = seatMatrix[Course_details.Course_id];
      var Quota_allocation = Quota_details.filter(
        (data) => data.Quota_name == result[0].Quota
      );

      if (parseInt(Quota_allocation[0].Quota_allocation) > 0 && !flag) {
        flag = true;
        console.log("Coursename", Course_details.Course_name);
        console.log("Student Id", result[0].student_id);
        // console.log("Student Details", result[0]);
        const updateStudent = await Student.updateOne(
          { student_id: result[0].student_id },
          {
            $set: {
              Course_id: Course_details.Course_id,
              allocation_status: "Allocated",
            },
          }
        );
        if (updateStudent.ok) {
          console.log("Student Updated successfully");
          var quotaCount = parseInt(Quota_allocation[0].Quota_allocation) - 1;
          const updatequota = await Institution.updateOne(
            {
              Institution_id: req.params.id,
              courseDetails: {
                $elemMatch: {
                  Course_id: Course_details.Course_id,
                  Quotas: {
                    $elemMatch: { Quota_name: Quota_allocation[0].Quota_name },
                  },
                },
              },
            },
            {
              $set: {
                "courseDetails.$[i].Quotas.$[j].Quota_allocation": quotaCount,
              },
            },
            {
              arrayFilters: [
                {
                  "i.Course_id": Course_details.Course_id,
                },
                {
                  "j.Quota_name": Quota_allocation[0].Quota_name,
                },
              ],
            }
          );
          if (updatequota.ok) {
            console.log("Quota Updated");
          }
        }
      }
      // break;
    }
    if (!flag) {
      const updateStudent = await Student.updateOne(
        { student_id: result[0].student_id },
        {
          $set: {
            Course_id: " ",
            allocation_status: "WL",
          },
        }
      );
      if (updateStudent.ok) {
        console.log("Student Updated");
      }
    }
    // break;
  }
  return res.status(200).json({ msg: "Students allocated successfully" });
}
module.exports = {
  getStudent,
  addStudent,
  rankCalculation,
};
