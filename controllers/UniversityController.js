const University=require("../models/University")


exports.NewUniversity=(req,res)=>
{
console.log("NewUniversity");
const university=new University(req.body);
university.save
}
