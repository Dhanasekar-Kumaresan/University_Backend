const express= require('express')
const studentCtrl=require('../controllers/student-controller')
const upload = require('../middleware/upload')

const studentRouter=express.Router()

studentRouter.get('/view',studentCtrl.getStudent)
studentRouter.get('/search/:status?/:text',studentCtrl.searchStudentName)
studentRouter.get('/filterCourse/:id',studentCtrl.getByStudentCourse)
studentRouter.get('/filterStatus/:id',studentCtrl.getByStudentStatus)
studentRouter.put('/update/:id',studentCtrl.modifyStudent)
studentRouter.post('/add',studentCtrl.addStudent),
studentRouter.post('/getStudentMarksData',studentCtrl.getStudentMarks)

module.exports=studentRouter