const express= require('express')
const institutionCtrl=require('../controllers/institution-controller')

const institutionRouter=express.Router()

institutionRouter.get('/view',institutionCtrl.getInstitution)
institutionRouter.post('/add',institutionCtrl.addInstitution)

module.exports=institutionRouter