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



async function addCourse(req, res) {
  let body = req.body;
  console.log(req.params.id)
  if (!body) {
    return res.status(400).json({
      success: false,
      message: "Need a valid input",
    });
  }
  Institution.updateMany(
    {
      Institution_id:req.params.id
    },{
    $push:
    {
      "courseDetails":body
    }
  }
  )
  .then((data)=>
  {
    return res.status(200).json({msg:"Course Updated Successfully", data:data})
  })
  .catch((error)=>
  {
    return res.status(404).json({msg:"error",error:error})
  })
}



module.exports = {
  getInstitution,
  addInstitution,
  addQuota,
  getInstitutionById,
  getCourseById,
  addCourse
};
