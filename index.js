require("dotenv").config()
const mongoose=require("mongoose")
const express=require("express");
const bodyparser=require("body-parser")
const cors=require("cors")

//console.log("fun"+process.env.DATABASE_URL_UNIVERSITY);



const Regulation_Routes=require("./routes/Regulation");
const Academic_Routes=require("./routes/Academic")
const routes=require("./routes/routes")

const Department_Routes=require("./routes/Department")
const Subject_Routes=require("./routes/Subject")
const University_Routes=require("./routes/University")
const Batch_Routes=require("./routes/Batch")
const app=express()
app.use(bodyparser.json())
app.use(cors());

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



app.use("/",routes);
//Regulation Routes
app.use("/Regulation",Regulation_Routes);

//Academic Routes
app.use("/Academic",Academic_Routes);

//Department
app.use("/Department",Department_Routes);

//Subject
app.use("/Subject",Subject_Routes);

//university
app.use("/University",University_Routes);

//Batch
app.use("/Batch",Batch_Routes)
app.listen(process.env.PORT,()=>{
    console.log("server started");
})