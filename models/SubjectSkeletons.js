const mongoose=require("mongoose")
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const validator = require('validator');

const SubjectSkeletons = new mongoose.Schema(
    {
        subject_type :
        {
            type:String,
            required:true,
            trim:true  
        },
        total_marks_subject :
        {
            type : Number,
            required:true
        },
        passing_percentage : 
        {
            type:String,
            required:true,

        },
        subject_contributors : [{

            sNo : 
            {
               type : Number,
               required : true
            },
            type_of_evaluation : 
            {
                type:String,
                required:true,
                trim:true  
    
            },
            total_marks :
            {
                type : Number,
                default : 0
                
            },
            individual_contribution :
            {
                type: SchemaTypes.Double,
                required : true
    
            }
        }
        ]  
    }
);

module.exports=mongoose.model('SubjectSkeletons',SubjectSkeletons) 