const express= require('express')
const studentCtrl=require('../controllers/student-controller')

const studentRouter=express.Router()

studentRouter.get('/view',studentCtrl.getStudent)
studentRouter.get('/search/:text',studentCtrl.searchStudentName)
studentRouter.get('/filterCourse/:id',studentCtrl.getByStudentCourse)
studentRouter.get('/filterStatus/:id',studentCtrl.getByStudentStatus)
studentRouter.put('/update/:id',studentCtrl.modifyStudent)
studentRouter.post('/add',studentCtrl.addStudent)

module.exports=studentRouter