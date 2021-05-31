const { validationResult } = require("express-validator");
const Subject = require("../models/Subject");
const Semester = require("../models/Semester");
const Regulation = require("../models/Regulation");

//get the all subject
exports.GetSubject = (req, res) => {
  console.log("get in Subject");
  Subject.find()
    .then((data) => {
      return res.status(200).json({ data: data, msg: "success" });
    })
    .catch((error) => {
      return res.status(500).json({ msg: "error", error: error });
    });
};

//create a new subject
exports.NewSubject = (req, res) => {
  var Error = validationResult(req);
  if (!Error.isEmpty()) {
    res.status(400).json({ msg: "Bad Request", error: Error });
  }
  var subject = new Subject(req.body);
  subject
    .save() 
    .then((data) => {
      Semester.findOne({$and:[{INSTITUTION_ID: req.params.ins_id},{COURSE_ID: req.params.course_id},{DEPARTMENT_ID: req.params.dept_id},{SEMESTER_ID : req.params.sem_id}]}).then((item)=>{
        console.log("item is ",item)
        Semester.findByIdAndUpdate(
          item._id,
          { $push: { SUBJECTS: data._id } },
          { new: true, useFindAndModify: false }
         ).then((semdata)=>{console.log("sem data updated succesfully")}).catch((e)=>{console.log(e)});
      }).catch((e)=>{console.log(e)});
       return res.status(201).json({ msg: "Successs", data: data });
    })
    .catch((error) => {
      return res.status(404).json({ msg: "Error", error: error });
    });
};



//update the Subject
exports.UpdateSubject = (req, res) => {
  id = req.params.id;
  console.log(req.body);
  // Subject.updateOne({Subject_ID:req.params.id},req.body).then((data) => {
  //     if (data.nModified) {
  //       return res.status(200).json({ msg: "Updation Success ",data:data });
  //     } else {
  //       return res.status(404).json({ msg: "Updation Error,Id Not Found ",data:data});
  //     }
  //   })
  //   .catch((error) => {
  //     return res.status(404).json({ error: error });
  //   });
  // const update = {
  //   $set: {
  //     Subject_ID: req.body.Subject_ID,
  //     Subject_Name: req.body.Subject_Name,
  //     isActive: req.body.isActive,
  //     Type: req.body.Type,
  //     Department_ID: req.body.Department_ID,
  //     Regulation_ID: req.body.Department_Name,
  //     Credit: req.body.Credit,
  //   },
  // };
  Subject.updateOne({ Subject_ID: id }, req.body)
    .then((data) => {
      if(data.n)
      {
        return res.status(200).json({ msg: "Updation Success ", data: data });
      }
      else
      {
        return res.status(203).json({ msg: "ID not found", data: data });
      }
      
    })
    .catch((error) => {
      return res.status(500).json({ msg: "Updation Error ", data: data });
    });
};

// get the subject by ID
exports.GetSubjectByID = (req, res) => {
  Subject.findOne({ Subject_ID: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ error: "Subject not found" });
      } else {
        return res.status(200).json({ data: data });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: "Server Error" });
    });
};


exports.Delete_Subject=(req,res)=>
{
  console.log(req.params.id);
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("id is missing");
    return res.status(400).json({ error: errors });
  }
  Subject.deleteOne({ Subject_ID: req.params.id })
    .then((data) => {
      return res.status(200).json({ msg: "Deletion Success",id:req.params.id,data:data });
    })
    .catch((error) => {
      return res.status(404).json({ error: error });
    });
}


//multiple subject updation
exports.MultipleSubejct=(req,res)=>
{
  Subject.insertMany(req.body).then((data)=>
  {
    return res.status(200).json({msg:"Success",data:data})
  }).catch((data)=>
  {
    return res.status(409).json({msg:"Error",data:data})
  })
}




// -----------------------------updated design-------------------------------------------


exports.addsubject=(req,res)=>
{
  var Payload=req.body;
  console.log(Payload)
  var institution=req.params.instu_id;
  var regulation=req.params.regu_id;
  var departement=req.params.dep_id;
  console.log(institution,regulation,departement);

  Regulation.updateMany(
{
  Institution_id:institution,
  Regulation:
  {
    $elemMatch:
            {
              Regulation_ID:regulation,
              Department_Details:
              {
                  $elemMatch:
                    {
                      Department_ID:departement
                    }
              }
            }
  },

  
  
  
  //"Regulation.$.Department_Details.Department_ID":departement

}

,
{
  $push:
  {
    "Regulation.$[outer].Department_Details.$[inner].Subject":Payload
  }
}
,
{
  "arrayFilters":
            [
                {

                 "outer.Regulation_ID":regulation

                }
                ,
                {

                  "inner.Department_ID":departement
                } 

              ]
}
)
.then((data)=>
{
  return res.status(200).json({data:data})
})
.catch((error)=>
{
  return res.status(404).json({"msg":"error",error:error})
})


}


// get subject
// exports.getsubject=(req,res)=>
// {
//   var institution=req.params.instu_id;
//   var regulation=req.params.regu_id;
//   var departement=req.params.dep_id;
//   console.log(institution,regulation,departement);

// Regulation.find(
//     {      
//                               Institution_id: institution
//                               ,
//                                 Regulation:
//                                     {
//                                       $elemMatch:
//                                                   {                              
//                                                     "Regulation_ID":regulation,
//                                                     "Department_Details.Department_ID":departement                                      
                                                                        
                                                                    
//                                                   }
//                                     }   
//     }
//     ,
//     {
//       Regulation:
//       {
//         $elemMatch:
//                     {
//                       "Regulation_ID":regulation,
//                         "Department_Details":
//                                               {

//                                                 $elemMatch:
//                                                 {
//                                                   "Department_ID":departement
//                                                 }
//                                               }                   
//                     }
//       }
//     }  
//   )
//   .then((data)=>
//     {
      
//       if(data.length)
//       {
//         var Subject;
//         data[0].Regulation[0].Department_Details.map(x=>{
//               if(x.Department_ID==departement)
//               {
//                 Subject=x.Subject;
//               }
//         })
//         console.log(Subject)
//         return res.status(200).json({msg:"sucess",data:Subject})
//       }
//       return res.status(200).json({msg:"Institution/Regulation/Department/Subject not found",data:data})
//     }
//   )
//   .
//   catch((error)=>
//   {
//     console.log("erro");
//     return res.status(404).json({"msg":"error",error:error})
//   })



// }

exports.getsubject=(req,res)=>
{
  var institution=req.params.instu_id;
  var regulation=req.params.regu_id;
  var departement=req.params.dep_id;
  console.log(institution,regulation,departement);

Regulation.aggregate(
   [{
    $unwind:"$Regulation"
  }
  ,
  {
    $unwind:"$Regulation.Department_Details"
  },
  {
    $match:
    {
      "Regulation.Regulation_ID":regulation,
      "Regulation.Department_Details.Department_ID":departement
    }
  }
   ]
  )
  .then((data)=>
  {
    //need to work on service itself
    console.log(data[0].Regulation.Department_Details.Subject);
    return res.status(200).json({msg:"sucess",data:data[0].Regulation.Department_Details.Subject})
  }
  )
  .
  catch((error)=>
  {
    console.log("erro");
    return res.status(404).json({"msg":"error",error:error})
  })



}






















//edit subject
exports.editsubject=(req,res)=>
{
 var Payload=req.body;
 var institution=req.params.instu_id;
 var regulation=req.params.regu_id;
 var departement=req.params.dep_id;
 var subject=req.params.subject_id;
 console.log(institution,regulation,departement,subject);


 //change find to update
 
Regulation.updateOne(

  {
      Institution_id:institution,
      // 1.
      // "Regulation":
      // {
        Regulation:{
                         $elemMatch:
                                {
                                  Regulation_ID:regulation,
                                  Department_Details:
                                                    {
                                                      $elemMatch:
                                                      {
                                                        Department_ID:departement
                                                      },
                                                      // 1.
                                                          //  "Subject.Subject_ID":subject                          
                                                      


                                                    }


                                }
                    }
        
      // }
  },
  {
    $set:
          {
            "Regulation.$[i].Department_Details.$[j].Subject.$":Payload
          }
  },
  {

    "arrayFilters":
    [
       
        {
          "i.Regulation_ID":regulation
        },
        {
            "j.Department_ID":departement
        },
        {
          "Subject.Subject_ID":subject
        }
    ]

  }
  
)
.then((data)=>
{
  return res.status(200).json({msg:"sucess",data:data})
})
.catch((error)=>
{
  return res.status(404).json({"msg":"error",error:error})
})


}

// get subject based on subject code
exports.getsubjectbyid=(req,res)=>
{
  var institution=req.params.instu_id;
 var regulation=req.params.regu_id;
 var departement=req.params.dep_id;
 var subject=req.params.subject_id;
 console.log(institution,regulation,departement,subject);

 Regulation.aggregate(
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
  $unwind:"$Regulation.Department_Details.Subject"
}
,
{
  $match:
  {
    "Regulation.Regulation_ID":regulation,
    "Regulation.Department_Details.Department_ID":departement,
    "Regulation.Department_Details.Subject.Subject_ID":subject
  }
}

]

 )
 .then((data)=>
 {
   //need to work on service itself
   console.log(data[0].Regulation.Department_Details.Subject);
  return res.status(200).json({msg:"sucess",data:data[0].Regulation.Department_Details.Subject})
 })
 .catch((error)=>
 {
  return res.status(404).json({"msg":"error",error:error})
 })
}
