const { validationResult } = require("express-validator");
const Curriculum= require("../models/Curriculum");
const Department_Details=require("../models/DepartmentDetails");





exports.newcurriculum=async(req,res)=>
{
    const Payload=req.body;
    const curriculum=new Curriculum(Payload)
 
    let curriculum_result=await curriculum.save().then((data)=>{return data}).catch((error)=>{return error})
    
        if(curriculum_result._id)
        {
             
            console.log("inside\n");
        
Department_Details.updateOne(
    {Regulation_ID:curriculum_result.Regulation_ID,Regulation_ID:curriculum_result.Regulation_ID,Department_:
        {$elemMatch:{Department_ID:{$eq:curriculum_result.Department_ID}}}},
                    {$set:{"Department_.$.Curriculum_Details":curriculum_result._id}}).then((item)=>
                    {
                        console.log("done",item);
                        return res.status(201).json({"msg":"success",data:item})
                    })
                    .catch((error)=>
                    {
                        return res.status(404).json({"msg":"error",error:error})
                    })                     

          









//             Department_Details.findOne({Regulation_ID:curriculum_result.Regulation_ID}).then((data)=>
//             {
//                 console.log("yes")
//                 console.log(data);
// Department_Details.updateOne(
//     {Regulation_ID:curriculum_result.Regulation_ID,Department_:
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

//             })



        }
        else
        {
                return res.status(404).json({"msg":"error",error:curriculum_result})
        }

}


