var faker = require('faker');
const StudentData=require("../models/StundentDetails");

exports.addstudent=(req,res)=>
{
    const body = req.body
    //console.log(body.Courses[0].years[0].Student_List);

    const fakeData = {}
    for (var i = 0; i < 10; i++) {
      fakeData.name = faker.name.findName()
      fakeData.student_id = "INC0" + faker.datatype.number()
      fakeData.profilePic = faker.image.avatar();
      body.Courses[0].years[0].Student_List.push(fakeData);

  
 
  
    }
   // console.log(body.Courses[0].years[0].Student_List);
   var Payload=body;
   var student=new StudentData(Payload);
   student.save()
   .then((data)=>
   {
      
return res.status(200).json({msg:"Success",data:data});
   })
 .catch((error)=>
 {
  return res.status(404).json({msg:"Error",data:error});
 })
   

  }
  