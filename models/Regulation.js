const mongoose=require("mongoose")
const Curriculum_Subject=new mongoose.Schema({
  Subject_Code:
  {
      type:String,
      trim:true,
      required:true,
      unique:true
  },
  Type:
  {
      type:String,
      trim:true,
      required:true
  },
  Subject_Name:
  {
      type:String,
      trim:true,
      required:true
  },
  Description:
  {
      type:String,
      trim:true,
      required:true
  },
  Credits:
  {
      type:Number,
      trim:true,
      required:true
  },
  Group_Name:
  { 
      type:String,
      trim:true
  },
  evalCriteria : {
    type:Array

  }

  
  })
  
  const Semester_Details=new mongoose.Schema({
  
  Semester_NO:
  {
      type:Number,
      trim:true,
      required:true,
      unique:true
  },
  Subjects:[Curriculum_Subject]
  
  
  
  })
  
  
  const Curriculum=new mongoose.Schema({  
  
  Curriclum_Code:
  {
      type:String,
      trim:true,
      required:true
  },
  Curriculum_Name:
  {
      type:String,
      trim:true,
      required:true
  },
  Batch_Year:
  {
      type:Number,
      trim:true,
      required:true
  },
  Department_ID:
  {
      type:String,
      trim:true,
      required:true
  },
  Semester_Data:[Semester_Details]
  
  })









const Subjects=new mongoose.Schema(
  {
      Subject_ID:
      {
          type:String,
          required:true,
          unique:true,
          trim:true,   
      }, 
      Subject_Name:
      {
          type:String,
          required:true,
          trim:true,
      },
      isActive:
      {
          type:Boolean,
          required:true,

      },
      Type:
      {
          type:String,
          required:true,
          trim:true
      },
      Credit:
      { 
          type:Number,
          required:true
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
    trim:true,
  
},
Regulation_Name:
{
    type:String,
    required:true,
    trim:true,
   
}
,
Academic_Year:
{
  type:Array,
  required:true,
},

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



