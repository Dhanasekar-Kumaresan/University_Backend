const express= require('express')
const universityCtrl=require('../controllers/university-controller')

const universityRouter=express.Router()

universityRouter.get('/view',universityCtrl.getUniversity)


module.exports=universityRouter