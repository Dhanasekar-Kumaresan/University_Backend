const mongoose=require("mongoose")
const Curriculum_Subject=new mongoose.Schema({
  Subject_ID:
  {
      type:String,
      trim:true
  },
  Type:
  {
      type:String, 
      trim:true
  },
  Subject_Name:
  {
      type:String,
      trim:true
  },
  Description:
  {
      type:String,
      trim:true
  },
  Credits:
  {
      type:Number,
      trim:true
  },
  Group_Name:
  { 
      type:String,
      trim:true
  },
  evalCriteria : { 
    type:Object

  },
  flag : {
    type:Boolean,
    default:false

  },
  subjectPattern : {
    type:String
 
  }

  
  })
  
  const Semester_Details=new mongoose.Schema({
   
  Semester_NO:
  {
      type:Number,
      trim:true
  },
  Subjects:[Curriculum_Subject]
  
  
  
  })
  
  
  const Curriculum=new mongoose.Schema({  
  
  Curriclum_Code:
  {
      type:String,
      trim:true
  },
  Curriculum_Name:
  {
      type:String,
      trim:true
  },
  Batch_Year:
  {
      type:Number,
      trim:true
  },
  Department_ID:
  {
      type:String,
      trim:true
  },
  Semester_Data:[Semester_Details]
  
  })









const Subjects=new mongoose.Schema(
  {
      Subject_ID:
      {
          type:String,
          trim:true,   
      }, 
      Subject_Name:
      {
          type:String,
          trim:true,
      },
      isActive:
      {
          type:Boolean

      }, 
      Type:
      {
          type:String,
          trim:true
      },
      Credit:
      { 
          type:Number
      },

  }
);









const Department=new mongoose.Schema(  
  {
    Subject:[Subjects],
    Department_ID:
      {
        type:String, 
        required:true,
        trim:true,
      },
      Department_Name:
      {
        type:String,
        required:true,
        trim:true,
      },
    
      Total_Credit:
      { 
        type:Number,
        required:true
      },
      Semester_Count:
      {
        type:Number,
        required:true
      },
      Credits_Details:
      {
        type:Array,
        required:true
    
      },
      Curriculum_Details:[Curriculum]
    });

const GradeSchema=new  mongoose.Schema({

GradeType:
{
  type:String,
  required:true,
  trim:true
},
RangeLow:
{
  type:Number,
  required:true
},
RangeHigh:
{
  type:Number,
  required:true
},
GradingDetails:
{
  type:Array,
  required:true
}
});



const Regulations_Schema=new mongoose.Schema(
{
Active:
{
  type:Boolean
},

Regulation_ID: 
{
    type:String, 
    required:true, 
    trim:true
  
},
Regulation_Name:
{
    type:String,
    required:true,
    trim:true
}
,
Academic_Start_Year:
{
  type:Number,
  required:true
},
Academic_End_Year:
{
  type:Number
},

  Course_Type:
            {
              type:String,
              required:true
            }
            ,
            

Grading:
{
  type:GradeSchema,
  required:true
},
Department_Details:[Department],

evaluationCriteria:
{
  type:Array

}



}
); 

const Regulation_Schema=new mongoose.Schema(
{

  Institution_id:
    { 
    type:String, 
     required:true,
     unique:true
    },
     Regulation:[Regulations_Schema]
}
)




module.exports=mongoose.model("Regulation",Regulation_Schema);
//model 
// {
// INSTUTUION_id:"",

// regulation:[
// {},{},
// {}

// ]



// }



// subject:[


// {
// regulation:"",
// subject_list:[
//   {},
//   {}
// ]

// }


// ]



