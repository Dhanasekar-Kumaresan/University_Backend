const Institution = require("../models/institution-model");
const Regulation = require("../models/Regulation");
const University = require("../models/university-model");

async function getInstitution(req, res) {
  try {
    let institution = await Institution.find({});
    if (!institution.length) {
      return res
        .status(200)
        .json({ success: false, message: `Institution not found` });
    }
    return res.status(200).json({ success: true, data: institution });
  } catch {
    return res.status(400).json({
      success: false,
      message: "Unknown error in fetching Institution!!! Contact Admin",
    });
  }
}
async function getInstitutionById(req, res) {
  try {
    let institution = await Institution.find({Institution_id:req.params.id});
    if (!institution.length) {
      return res
        .status(200)
        .json({ success: false, message: `Institution not found` });
    }
    return res.status(200).json({ success: true, data: institution });
  } catch {
    return res.status(400).json({
      success: false,
      message: "Unknown error in fetching Institution!!! Contact Admin",
    });
  }
}

async function getCourseById(req, res) {
  try {
    let institution = await Institution.find({Institution_id:req.params.id},
      {courseDetails:{$elemMatch: {Course_id : req.params.Courseid} }}
      );
    if (!institution.length) {
      return res
        .status(200)
        .json({ success: false, message: `Institution not found` });
    }
    return res.status(200).json({ success: true, data: institution });
  } catch {
    return res.status(400).json({
      success: false,
      message: "Unknown error in fetching Institution!!! Contact Admin",
    });
  }
}
async function addInstitution(req, res) {
  let body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      message: "Need a valid input",
    });
  }

  try {
    let university = await University.findOne({
      University_id: body.University_id,
    });
    if(university)
    {
      body.University_id = university._id;
    }
    let institution_body = new Institution(body);
    console.log(institution_body)
    let institution = await institution_body.save();

    if (institution) {
      return res
        .status(200)
        .json({
          success: true,
          id: institution.Institution_id,
          message: "Institution Added Successfully",
        });
    }
  } catch (err) {
    if (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        return res
          .status(422)
          .send({ succes: false, message: "Institution already exist!" });
      }
      return res.status(422).send(err);
    }
  }
}
// async function addQuota(req,res){
//           let body =req.body
//           if(!body){
//             return res.status(400).json({
//               success: false,
//               message: "Need a valid input",
//             });
//           }    
//           try{
//             let update_data;
//             Institution.findOne({Institution_id:req.params.id}).then( (institution) =>{
              
//               Institution.updateOne({_id:institution._id},{$elemMatch :{courseDetails:{$elemMatch:{Course_id: {$each:body.CourseDetails.Course_id}}}}},
//                 {
//                   $push:{Quotas:{ $each:body.CourseDetails.Quotas}}
//                 }).then( (data, err)=>{
//                   if(data){console.log(data)}
//                   else{console.log(err)}
//                 })
                
//             // let  Quota_details= institution.courseDetails.forEach( (output) => {
//             //      let output_details=body.CourseDetails.forEach( (input) =>{
//             //           if(output.Course_id == input.Course_id){
//             //               output.Quotas=input.Quotas
//             //           }
//             //       })
//             //       update_data=output;
//             //   });
              
//              });
//         //     console.log(update_data)
//         //   let data=Institution.updateOne({Institution_id:req.params.id},
//         //       {
//         //       $set:{
//         //         courseDetails:update_data
//         //        }
//         // });
//         // if(data.ok){
//         //   return res.status(200).json({
//         //     success: true,
//         //     message: "Quota Detail added successfully!",
//         //   });
//         // }
//         // body.CourseDetails.forEach(element => {
           
//         // });
       
//           }
//           catch(e)
//           {
//             return res.status(400).json({
//               success: false,
//               message: e,
//             });
//           }
// }



// -----------------------raghu 
// async function addQuota(req,res){
//   let body =req.body
//             if(!body){
//               return res.status(400).json({
//                 success: false,
//                 message: "Need a valid input",
//               });
//             }
//   //  for(i=0;i<body.CourseDetails.length;i++){
//     Institution.updateOne(
//       {
//       Institution_id:req.params.id,
//        "courseDetails.Course_id":body.CourseDetails[0].Course_id
            
//       // courseDetails:{$elemMatch:{Course_id:{$eq:body.CourseDetails[0].Course_id}}}
//       },
//     {$set:
//       {"courseDetails.$[].Course_duration": body.Course_duration}
//     }
    
//     ).then ( (data) =>{ 
//       console.log("Success",data)     
//     }).catch( (e) =>{
//       console.log("Error",e)
//     })
//   //   console.log(i,body.CourseDetails[i].Course_id, "Quotas",body.CourseDetails[i] )
//   //  }
  
//     }



    //dk
function addQuota(req,res)
{
  var payload=req.body;

  Regulation.updateOne(
  {
    Institution_id:req.params.id,
    "courseDetails.Course_id":payload.Course_id
  }
  ,
  {
    $set:
    {
      "courseDetails.$.Quotas":payload.Quotas
    }
  }
  
  ).
  then((data)=>
  {
    return res.status(200).json({msg:"Quota Updated Successfully", data:data})
  })
  .catch((error)=>
  {
    return res.status(404).json({msg:"error",error:error})
  })



  
}
//GET for Course list [btech, mtech, mca]
async function getCourseList(req, res) {
  try {
    let institution = await Institution.find({Institution_id:req.body.ins_id});
    if (!institution.length) {
      return res
        .status(200)
        .json({ success: false, message: `Institution not found` });
    }
    else{
    let courseSet = new Set();
    institution[0].courseDetails.forEach((input)=>{
      courseSet.add(input.Course_type);
    });
    return res.status(200).json(Array.from(courseSet));}
  } catch(error){
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

//GET for fetching Departments for an Institution
async function getDepartmentList(req, res) {
  try {
    let institution = await Institution.find({Institution_id:req.body.ins_id});
    if (!institution.length) {
      return res
        .status(200)
        .json({ success: false, message: `Institution not found` });
    }
    else{
    let deptList = [];
    let name = req.body.cor_id;
    institution[0].courseDetails.forEach((input)=>{
      if(input.Course_type == name){
      deptList.push(input.Course_name);}
    });
    return res.status(200).json(deptList);}
  } catch(error){
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

//GET for fetching Subjects
async function getSubjectList(req, res) {
  try {
    let subjectData =await Regulation.aggregate(
      [
     {
       $unwind:"$Regulation"
     }
     ,
     {
       $unwind:"$Regulation.Department_Details"
     }
     ,
     {
       $unwind:"$Regulation.Department_Details.Curriculum_Details"
     },
     {
       $unwind:"$Regulation.Department_Details.Curriculum_Details.Semester_Data"
     },
     {$match:{"Institution_id": req.body.ins_id,
       "Regulation.Regulation_ID":req.body.reg_id,
       "Regulation.Department_Details.Department_ID":req.body.dep_id,
       "Regulation.Department_Details.Curriculum_Details.Curriclum_Code":req.body.cur_no,
       "Regulation.Department_Details.Curriculum_Details.Semester_Data.Semester_NO":parseInt(req.body.sem_no)
     }}
     
     
     ])
   //console.log(subjectData[0].Regulation.Department_Details.Curriculum_Details.Semester_Data);
   
   return res.status(200).json({msg:"sucess",data:subjectData[0].Regulation.Department_Details.Curriculum_Details.Semester_Data})
    
  } catch(error){
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}


async function getSemesterList(req, res) {
  try {
    let semData =await Regulation.aggregate(
      [
     {
       $unwind:"$Regulation"
     }
     ,
     {
       $unwind:"$Regulation.Department_Details"
     }
     ,
     {
       $unwind:"$Regulation.Department_Details.Curriculum_Details"
     },
  
     {$match:{"Institution_id": req.body.ins_id,
     "Regulation.Regulation_ID":req.body.reg_id,
       "Regulation.Department_Details.Department_ID":req.body.dep_id,
       "Regulation.Department_Details.Curriculum_Details.Curriclum_Code":req.body.cur_no
      }},
      {
        $project:{"Regulation.Grading":0, "Regulation.evaluationCriteria":0}
      }

  
     ]);
     let sems = semData[0].Regulation.Department_Details.Curriculum_Details.Semester_Data;
     let semesters = [];
     for(var i = 0; i<sems.length; i++){
       semesters.push(sems[i].Semester_NO);
     }
   
   return res.status(200).json({msg:"sucess",semesters})
    
  } catch(error){
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

async function getAllInstitutions(req, res) {
  try {
    let institution = await Institution.find({});
    if (!institution.length) {
      return res
        .status(200)
        .json({ success: false, message: `Institution not found` });
    }

    var insArray = [];
     if(institution){
        for(var k = 0; k<institution.length; k++){
          insArray.push({
            instituteID: institution[k].Institution_id,
            instituteName: institution[k].Institution_name});

        }
      }
    return res.status(200).json({ success: true, insArray });
  } catch {
    return res.status(400).json({
      success: false,
      message: "Unknown error in fetching Institution!!! Contact Admin",
    });
  }
}

module.exports = {
  getInstitution,
  addInstitution,
  addQuota,
  getInstitutionById,
  getCourseById,
  getCourseList,
  getDepartmentList,
  getSubjectList,
  getSemesterList,
  getAllInstitutions
};
