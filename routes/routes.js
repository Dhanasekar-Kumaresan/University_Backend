const express=require("express")
var router=express.Router()


//controllers
var {home}=require("../controllers/routes");

router.get("/",home);


module.exports=router;