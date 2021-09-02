const express= require('express')
const institutionCtrl=require('../controllers/institution-controller')

const institutionRouter=express.Router()

institutionRouter.get('/view',institutionCtrl.getInstitution)
institutionRouter.get('/view/:id',institutionCtrl.getInstitutionById)
institutionRouter.get('/view/:id/:Courseid',institutionCtrl.getCourseById)
institutionRouter.post('/add',institutionCtrl.addInstitution)
institutionRouter.put('/quota/:id',institutionCtrl.addQuota)
institutionRouter.put('/course/:id',institutionCtrl.addCourse)

institutionRouter.get('/all',institutionCtrl.getAllInstitutions)
institutionRouter.post('/courses/',institutionCtrl.getCourseList)
institutionRouter.get('/courseswithyears/:instu_id',institutionCtrl.getCourseListWithYear)
institutionRouter.post('/branchList/',institutionCtrl.getDepartmentList)

institutionRouter.post('/branchListWithID/',institutionCtrl.getDepartmentListWithID)
institutionRouter.post('/subjects/',institutionCtrl.getSubjectList)
institutionRouter.post('/semesters/',institutionCtrl.getSemesterList)

module.exports=institutionRouter