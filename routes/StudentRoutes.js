const express= require('express')
const {addstudent}=require('../controllers/StudentController')


const Router=express.Router()
Router.post("/addstudent",addstudent);



module.exports=Router;




// {
//     instu_id:"",
//     course_id:""
//     {
//         year:""
//         list:""
//     }
// }