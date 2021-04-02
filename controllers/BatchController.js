
const Batch=require("../models/Batch")
exports.NewBatch=(req,res)=>
{
    console.log(req.body);
    const batch=new Batch(req.body);
    batch.save().then((data)=>
    {
        return res.status(200).json({msg:"Sucess",data:data})
    }).catch((error)=>
    {
        return res.status(404).json({masg:"Failed",error:error})
    })

}

exports.GetBatch=(req,res)=>
{
    Batch.find().then((data)=>
    {
        return res.status(200).json({data:data})
    }).catch((error)=>
    {
        return res.json(500).json({msg:"Server Error",error:error})
    })
}




exports.GetBatchByID=(req,res)=>
{
    console.log(req.params.id)
    Batch.findOne({Bacth_ID:req.params.id}).then((data)=>
    {
        return res.status(200).json({data:data})
    }).catch((error)=>
    {
        return res.json(500).json({msg:"Server Error",error:error})
    })
}