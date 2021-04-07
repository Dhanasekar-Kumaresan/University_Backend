const {validationResult}=require("express-validator")
const Department=require("../models/Department")



//create Department
exports.New_Department=(req,res)=>{
  var Errors=validationResult(req);
    if (!Errors.isEmpty()) {
        console.log("bad request");
        return res.status(400).json({ errors: Errors.errors });
      }
    
      const department = new Department(req.body);
      department
        .save()
        .then((data) => {
          console.log("Data saved");
          return res.status(201).json({ msg: "Success" ,data:data});
        })
        .catch(() => {
          console.log("Data not saved");
          return res.status(401).json({ msg: "Error" });
        });
}

//get the department
exports.GetDepartment=(req,res)=>
{
  Department.find().then((items)=>
  {
    console.log(items);
return res.status(200).json({data:items});
  }).catch((error)=>{
    return res.status(500).json({error:error});
  });
}

//get the department with ID

exports.GetDepartmentById=(req,res)=>
{
  console.log(req.params.id);
  Department.findOne({Department_ID: req.params.id}).then((data)=>
  {
    console.log("data",data)
    if(!data)
    {
      return res.status(404).json({msg:"ID Not Found"});  
    }
    return res.status(200).json({msg:"Success",Data:data});
  }).catch((error)=>
  {
    return res.send(500).json({msg:"Server Error",error:error});
  })


}