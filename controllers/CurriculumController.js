const { validationResult } = require("express-validator");
const Curriculum= require("../models/Curriculum");
const Department_Details=require("../models/DepartmentDetails");
const Regulation = require("../models/Regulation");




//new curriculum
// exports.newcurriculum=async(req,res)=>
// {
//     const Payload=req.body;
//     const curriculum=new Curriculum(Payload)
 
//     let curriculum_result=await curriculum.save().then((data)=>{return data}).catch((error)=>{return error})
    
//         if(curriculum_result._id)
//         {
             
//             console.log("inside\n");
        
// Department_Details.updateOne(
//     {Regulation_ID:curriculum_result.Regulation_ID,Regulation_ID:curriculum_result.Regulation_ID,Department_:
//         {$elemMatch:{Department_ID:{$eq:curriculum_result.Department_ID}}}},
//                     {$set:{"Department_.$.Curriculum_Details":curriculum_result._id}}).then((item)=>
//                     {
//                         console.log("done",item);
//                         return res.status(201).json({"msg":"success",data:item})
//                     })
//                     .catch((error)=>
//                     {
//                         return res.status(404).json({"msg":"error",error:error})
//                     })                     

          









// //             Department_Details.findOne({Regulation_ID:curriculum_result.Regulation_ID}).then((data)=>
// //             {
// //                 console.log("yes")
// //                 console.log(data);
// // Department_Details.updateOne(
// //     {Regulation_ID:curriculum_result.Regulation_ID,Department_:
// //         {$elemMatch:{Department_ID:{$eq:curriculum_result.Department_ID}}}},
// //                     {$set:{"Department_.$.Curriculum_Details":curriculum_result._id}}).then((item)=>
// //                     {
// //                         console.log("done",item);
// //                         return res.status(201).json({"msg":"success",data:item})
// //                     })
// //                     .catch((error)=>
// //                     {
// //                         return res.status(404).json({"msg":"error",error:error})
// //                     })                     

// //             })



//         }
//         else
//         {
//                 return res.status(404).json({"msg":"error",error:curriculum_result})
//         }

// }


exports.newcurriculum=(req,res)=>
{
    var Payload=req.body;
    console.log(Payload.Department_Details);
    var institution=req.params.instu_id;
    var regulation=req.params.regu_id;
    var departement=req.params.dep_id;
    console.log(institution,regulation,departement);

    var Batch_Year=Payload.Batch_Year;




    

    Regulation.updateOne(
        {
            Institution_id:institution,
              Regulation:{
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
                          }
        },
        {
            $push:
                    {
                        "Regulation.$[i].Department_Details.$[j].Curriculum_Details":Payload
                    }
        }
        ,
        {
            "arrayFilters":
                            [
                                {
                                    "i.Regulation_ID":regulation
                                  },
                                  {
                                      "j.Department_ID":departement
                                  }
                                
                                 
                                 
                            ]
        }
    )
    .then((data)=>
    {
        return res.status(200).json({msg:"success",data:data})
    })
    .catch((Error)=>
    {
        return res.status(404).json({"msg":"error",error:Error})
    })
   
}


exports.getcurriculum=(req,res)=>
{
    var institution=req.params.instu_id;
    var regulation=req.params.regu_id;
    var departement=req.params.dep_id;
    var Batch_Year=parseInt(req.params.batch_year);
    console.log(institution,regulation,departement,Batch_Year);

    Regulation.aggregate(
        [{
         $unwind:"$Regulation"
       }
       ,
       {
         $unwind:"$Regulation.Department_Details"
       },
       {
        $unwind:"$Regulation.Department_Details.Curriculum_Details"
       }
       ,
       {
         $match:
         {
           "Regulation.Regulation_ID":regulation,
           "Regulation.Department_Details.Department_ID":departement,
           "Regulation.Department_Details.Curriculum_Details.Batch_Year":Batch_Year
         }
       }
        ]
       )
       .then((data)=>
       {
         //need to work on service itself
         console.log(data[0].Regulation.Department_Details.Curriculum_Details);
         return res.status(200).json({msg:"sucess",data:data[0].Regulation.Department_Details.Curriculum_Details})
       }
       )
       .
       catch((error)=>
       {
         console.log("erro");
         return res.status(404).json({"msg":"error",error:error})
       })

}