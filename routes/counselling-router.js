const express= require('express')
const counsellingCtrl=require('../controllers/counselling-controller')

const councellingRouter=express.Router()



councellingRouter.get('/view',counsellingCtrl.getStudent)
councellingRouter.post('/add/:id/:course_type',counsellingCtrl.addStudent)
councellingRouter.post('/rank/:id/:course_type',counsellingCtrl.rankCalculation)


module.exports=councellingRouter;