require("dotenv").config()
const mongoose=require("mongoose")
const express=require("express");
const cors=require("cors")

//DB Connection
mongoose.connect(process.env.DATABASE_URL_UNIVERSITY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(()=>{
    console.log("Database Connected");
}).catch(()=>{
    console.log("Connection Error");
});


const app=express()
app.use(express.urlencoded());
  app.use(express.json())
app.use(cors());



const universityRouter=require("./routes/university-router")
const studentRouter=require("./routes/student-router")

const Course_Routes=require("./routes/CourseRoutes")
const Semester_Routes=require("./routes/Semester")


app.use("/university",universityRouter)
app.use("/student",studentRouter)






//Dk
const Regulation_Routes=require("./routes/Regulation");
const Academic_Routes=require("./routes/Academic")
const routes=require("./routes/routes")

const Department_Routes=require("./routes/DepartmentRoutes")
const Subject_Routes=require("./routes/Subject")

const Batch_Routes=require("./routes/Batch")
const Curriculum_Routes=require("./routes/CurriculumRoutes")

//Routes
app.use("/",routes);
//Regulation Routes
app.use("/Regulation",Regulation_Routes);

//Academic Routes
app.use("/Academic",Academic_Routes);

//Department
app.use("/Department",Department_Routes);

//Subject
app.use("/Subject",Subject_Routes);


app.use("/Course",Course_Routes);

//Batch
app.use("/Batch",Batch_Routes)

//Semester
app.use("/Semester",Semester_Routes)





//Curriculums
app.use("/curriculum",Curriculum_Routes)

app.listen(process.env.PORT,()=>{
    console.log("server started");
})