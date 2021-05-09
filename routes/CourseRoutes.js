const express=require("express")
const Router=express.Router()
const {check}=require("express-validator")

const {addCourse, getCourses}=require("../controllers/CourseController")

Router.post("/addCourse",addCourse)
Router.get("/:id",getCourses)

module.exports=Router
