const mongoose= require('mongoose')

const Schema= mongoose.Schema

const College=new Schema({
    college_id:{type:String, required:true,unique:true},
    college_name:{type:String, required:false},
    collegeStrength:{type:String, required:false},
    AICTE_regID:{type:String, required:true},
    UGC_regID:{type:String, required:true},
    college_description:{type:String, required:false},
    established:{type:Date, required:false},
    ownershipType:{type:String, required:false},
    collegeCode:{type:String, required:false},
    hideCarousel:{type:Boolean,required:false},
    showRounds:{type:Boolean,required:false},
    depratmentDetails:[{
        department_id:{type:String,required:true, unique:true},
        department_name:{type:String,required:true},
        seats:{type:Number,required:false}
    }]
})

module.exports=mongoose.model('college',College) 