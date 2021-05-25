const mongoose=require("mongoose")


const Department=new mongoose.Schema(  
  {
    Subject:
    {
      type:Array
    }
    ,Department_ID:
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
      Curriculum_Details:
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Curriculum'
      }
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
Department_Details:[Department]



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



