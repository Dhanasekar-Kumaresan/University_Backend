const Student = require("../models/studentMaster-model");
const Institution = require("../models/institution-model");
const Regulation=require("../models/Regulation");
var faker = require("faker");
const { contentSecurityPolicy, crossOriginOpenerPolicy } = require("helmet");
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
  for (var i = 0; i < 10; i++) {
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
    //fakeData.status = "approved"; // need to be approved from ui
    fakeData.year = new Date().getFullYear();

    // fakeData.rank= Math.floor(Math.random() * (10000 - 999)) + 999 ;
    //console.log("Data" , fakeData);
    const studentData = new Student(fakeData);
    let student = await studentData.save();
  }
  return res.status(200).json({ msg: "Students added successfully" });
}

async function rankCalculation(req, res) {
  const student = await Student.find({
    institution_id: req.params.id,
    status: "approved",
    Course_type: req.params.course_type,
  });
  if(!student)
  {
    return res.status(400).json({ msg: "Student data not found for the selected institute & selected course type" });
  }
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
  seatMatrix = {};
  const course = await Institution.find({ Institution_id: req.params.id });
  course.forEach((element) => {
    for (let i = 0; i < element.courseDetails.length; i++) {
      if (element.courseDetails[i].Course_type == req.params.course_type) {
        seatMatrix[element.courseDetails[i].Course_id] =
          element.courseDetails[i].Quotas;
      }
    }
  });
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
           var Course_id=Course_details.Course_id;
           var Institution_id=req.params.id;
              //student mapping with core subject




              //quota count updation;
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
            // console.log("Quota Updated");
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





async function studentSubjectmapping(req,res)
{
console.log("fun");
institution_id=req.params.instu_id;
batch_year=parseInt(req.params.year);
course_id=req.params.course_id;
course_type=req.params.course_type;
console.log(institution_id,typeof(batch_year),course_id);

let student=await Student.find({$and:[{institution_id: institution_id,year:batch_year,Course_id:course_id,Course_type:course_type}]});
//year:batch_year,Course_id:course_id,Course_type:course_type
console.log(student);




Regulation.aggregate(
  [
    {
      $unwind:"$Regulation"
    },
    {
      $unwind:"$Regulation.Department_Details"
    },
    {
      $unwind:"$Regulation.Department_Details.Curriculum_Details"
    },
    {    
    $match:
            {
              "Institution_id": institution_id,
              "Regulation.Course_Type":course_type,
              "Regulation.Academic_Start_Year":{$lte:batch_year},
              "Regulation.Academic_End_Year":{$gte:batch_year},
              "Regulation.Department_Details.Department_ID":course_id,
              "Regulation.Department_Details.Curriculum_Details.Batch_Year":batch_year
            }
    },
    {
      $project:
      {
        "Regulation.Regulation_ID":1,
        "Regulation.Regulation_Name":1,
        "Regulation.Course_Type":1,
      "Regulation.Department_Details.Curriculum_Details":1}
    }
  ]
).
then((data)=>
{
  // data
   //console.log(data[0]["Regulation"]["Department_Details"]["Curriculum_Details"])
   Regulation_Id=data[0]["Regulation"]["Regulation_ID"];
   Curriculum_Id=data[0]["Regulation"]["Department_Details"]["Curriculum_Details"]["Curriclum_Code"]
   //console.log(Regulation_Id,Curriculum_Id)

   Student.updateMany({$and:[{institution_id: institution_id,year:batch_year,Course_id:course_id,Course_type:course_type}]},
    {
      $set:
      {
        Regulation_Id:Regulation_Id,
        Curriculum_Id:Curriculum_Id
      }
    }).then((data)=>
    {
      return res.status(200).json({ msg: "Students are mapped with Subjects",data:data});
    }).catch((error)=>
    {
      return res.status(400).json({ msg: "error",error:error });
    })

 // return res.status(200).json({ msg: "Success",data:data});
}).
catch(( error )=>
{
  return res.status(400).json({ msg: "error",error:error });

})
}


module.exports = {
  getStudent,
  addStudent,
  rankCalculation,
  studentSubjectmapping
};





// course_Avialablity:
//   [
//     MSC,
//     BSC,
//   ]