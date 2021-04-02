const {validationResult}=require("express-validator")
const Subject = require("../models/Subject")
//get the all subject
exports.GetSubject=(req,res)=>
{
    console.log("get in Subject")
    Subject.find().then((data)=>
    {
        return res.status(200).json({data:data,msg:"success"})
    }).catch((error)=>
    {
        return res.status(500).json({msg:"error",error:error})
    })
}

//create a new subject
exports.NewSubject=(req,res)=>
{
    console.log(req.body);
    var Error=validationResult(req);
    if(!Error.isEmpty())
    {
        res.status(400).json({msg:"Bad Request",error:Error});
    }
    var subject=new Subject(req.body);
    subject.save().then((data)=>
    {
        return res.status(201).json({msg:"Successs",data:data});
    }).catch((error)=>
    {
        
    return res.status(404).json({msg:"Error",error:error})
    })

}