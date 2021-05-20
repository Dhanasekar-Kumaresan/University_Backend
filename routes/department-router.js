const express= require('express')
const departmentCtrl=require('../controllers/department-controller')

const departmentRouter=express.Router()

departmentRouter.get('/view',departmentCtrl.getDepartments)
departmentRouter.post('/add/:institute/:course',departmentCtrl.addDepartments)

module.exports=departmentRouter