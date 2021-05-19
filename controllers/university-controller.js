const University = require("../models/university-model");
const Institution = require("../models/institution-model");

async function getUniversity(req, res) {
  try {
    let university = await University.find({});
    if (!university.length) {
      return res
        .status(200)
        .json({ success: false, message: `University not found` });
    }
    return res.status(200).json({ success: true, data: university });
  } catch {
    return res
      .status(400)
      .json({
        success: false,
        message: "Unknown error in fetching University!!! Contact Admin",
      });
  }
}

async function addUniversity(req, res) {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        message: "Need A valid input",
      });
    }
    const university_body = new University(body);
    try{
    let university = await university_body.save();

  if (university) {
    return res.status(200).json({  success:true,
      id:university.University_id,
      message:"University Added Successfully",
    });
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

// async function addUniversity(req,res){
//     const body= req.body
//     if(!body){
//         return res.status(200).json({
//             success:false,
//             message:'Need A valid input'
//         })
//     }
//     const university_data= {
//         "University_id":body.University_id,
//         "University_name":body.University_name,
//         "University_type": body.University_type,
//         "University_description": body.University_description
//     }
//     const univ=new University(university_data)
//     const institution_data=[]
//     body.Institutions.forEach(element => {
//         institution_data.push(element)
//     });
//     console.log(institution_data)
//     try{
//        // console.log("University data",univ,body.Institutions[0].Institution_id,institution_data)
//         let university =  await univ.save().then((data) => {
//             console.log("Data",data)

//             let institute=new Institution({
//                 University_id:data._id,
//                 Institution_id:institution_data[0].Institution_id,
//                 Institution_name:institution_data[0].Institution_name
//             })
//             console.log(institute)
//             let data1=institute.save().then( (institute_data)=>{
//                 console.log(institute_data)
//             }).catch( (e)=>{
//                 return res.status(404).json({ msg: " Inside institute Save Error", error: e });
//             })
//             if(data1)
//             {
//                 return res.status(200).json({msg:"success", error:e})
//             }
//         }).catch ((e) =>{
//             return res.status(404).json({ msg: "Inside university Save  Error", error: e });
//         })
//         if(university)
//         {
//             return res.status(200).json({msg:"success", error:e})
//         }

//     }
//     catch(err){
//         if (err) {
//             if (err.name === 'MongoError' && err.code === 11000) {
//               return res.status(422).send({ succes: false, message: 'University already exist!' });
//             }
//         }
//     }
// }

// async function addUniversity(req, res) {
//   const body = req.body;
//   if (!body) {
//     return res.status(200).json({
//       success: false,
//       message: "Need A valid input",
//     });
//   }
//   const university_data = {
//     University_id: body.University_id,
//     University_name: body.University_name,
//     University_type: body.University_type,
//     University_description: body.University_description,
//   };
//   const univ = new University(university_data);
//   let institution_data = [];
//   body.Institutions.forEach((element) => {
//     institution_data.push(element);
//   });
//   console.log(institution_data)
//   Institution.insertMany(institution_data).then( (institutions)=>{
//       console.log(institutions)

//   })
//   try {
//     let university = await univ.save().then((Data) => {
//         institute.save().then
//       University.findOne({ _id: Data._id }).then((university_record) => {
//         university_record.Institutions.push(Data._id);
//         University.findByIdAndUpdate(
//           Data._id,
//           { $push: { Institutions: Data._id } },
//           { new: true, useFindAndModify: false }
//         ).then(() => {
//            institute.save().then((Institute_Data) => {
//               Institution.findOne({ _id: Institute_Data._id }).then(
//               (institute_record) => {
//                 Institution.findByIdAndUpdate(
//                   Institute_Data._id,
//                   { $set: { Univesrity_id: Data._id } },
//                   { new: true, useFindAndModify: false }
//                 ).then((data1) => {
//                   console.log("data Updated Succesfully", data1);
//                 }).catch((e)=>{console.log("Error in sixth catch",e)});
//               }
//             ).catch((e)=>{console.log("Error in fifth catch",e)});
//           }).catch((e)=>{console.log("Error in fourth catch",e)});
//         }).catch((e)=>{console.log("Error in third catch",e)});
//       }).catch((e)=>{console.log("Error in second catch",e)});
//     }).catch((e)=>{console.log("Error in first catch",e)});
//     if(university)
//             {
//                 return res.status(200).json({msg:"success", error:e})
//             }
//   } catch {
//     if (err) {
//                     if (err.name === 'MongoError' && err.code === 11000) {
//                       return res.status(422).send({ succes: false, message: 'University already exist!' });
//                     }
//                 }
//   }
//}

module.exports = {
  getUniversity,
  addUniversity,
};
