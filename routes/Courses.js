const express=require("express")
const Router=express.Router()
const {check}=require("express-validator")

const {NewBatch,GetBatch, GetBatchByID}=require("../controllers/BatchController")

//newbatch
Router.post("/NewBatch",NewBatch)

//get all batch details
Router.get("/",GetBatch)

//get batch by id
Router.get("/:id",GetBatchByID)

module.exports=Router
