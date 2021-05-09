const University= require("../models/university-model")


async function getUniversity(req,res){
    try{
        let university = await University.find({})
        if (!university.length) {
            return res
                .status(200)
                .json({ success: false, message: `University not found` })
        }
        return res.status(200).json({ success: true, data: university })
    }
    catch {
        return res.status(400).json({ success: false, message: "Unknown error in fetching University!!! Contact Admin" })
    }
}
async function addUniversity(req,res){
    const body= req.body
    if(!body){
        return res.status(200).json({
            success:false,
            message:'Need A valid input'
        })
    }
    const univ=new University(body)
    try{
        let university= await univ.save();
        if(university){
            return res.status(200).json({
                success:true,
                id:university.univ_id,
                message:"University Added Successfully",
            })
        }
    }
    catch(err){
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
              return res.status(422).send({ succes: false, message: 'University already exist!' });
            }
            return res.status(422).send(err);
        }
    }
}
module.exports={
    getUniversity,
    addUniversity
}