const express= require('express')
const institutionCtrl=require('../controllers/institution-controller')

const institutionRouter=express.Router()

institutionRouter.get('/view',institutionCtrl.getInstitution)
institutionRouter.get('/view/:id',institutionCtrl.getInstitutionById)
institutionRouter.get('/view/:id/:Courseid',institutionCtrl.getCourseById)
institutionRouter.post('/add',institutionCtrl.addInstitution)
institutionRouter.put('/quota/:id',institutionCtrl.addQuota)

institutionRouter.get('/courses/:id',institutionCtrl.getCourseList)
institutionRouter.get('/branchList/:id/:course',institutionCtrl.getDepartmentList)
institutionRouter.get('/subjects/:reg_id/:dep_id/:cur_no/:sem_no',institutionCtrl.getSubjectList)

module.exports=institutionRouter