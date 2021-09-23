const express= require('express')
const studentCtrl=require('../controllers/student-controller')

const studentRouter=express.Router()

studentRouter.get('/view',studentCtrl.getStudent)
studentRouter.get('/search/:status?/:text',studentCtrl.searchStudentName)
studentRouter.get('/filterCourse/:id',studentCtrl.getByInstitute)
studentRouter.get('/filterCourse/:id/:Course_type',studentCtrl.getByCourseType)
studentRouter.get('/filterCourse/:id/:Course_type/:Course_id/:batch_year',studentCtrl.getByCourseID)
studentRouter.get('/filterStatus/:id',studentCtrl.getByStudentStatus)
studentRouter.put('/update/:id',studentCtrl.modifyStudent)
studentRouter.post('/add',studentCtrl.addStudent),
studentRouter.post('/getStudentMarksData',studentCtrl.getStudentMarksForExcel)
studentRouter.put('/updateStudentMarks/:ins_id/:reg_id/:dep_id/:cur_id/:sem_id/:sub_id',studentCtrl.updateStudentMarks)
studentRouter.patch('/updateStudentSGPA/:stu_id/:sem_id',studentCtrl.updateStudentSgpa);
studentRouter.post('/getStudentMarksDataForCourse',studentCtrl.getStudentMarksForCourse);
studentRouter.post('/getStudentMarksDataForSubject',studentCtrl.getStudentMarksForSubject)


module.exports=studentRouter