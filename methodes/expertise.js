const express=require('express');
const route=express.Router();
const Expertise=require('../models/expertise_model');
route.get("/expertises/:id",async(req,res)=>{
    const expertises=await Expertise.find({idExpert:req.params.id}).then((data)=>{
        console.log(data);
        console.log('Expertise finded successfully');
        res.status(200).json(data)
    })
    .catch((err)=>{
        console.log(err);
        console.log("there is an error in finding Expertises");
        res.status(404).send("error in finding Expertises");
    })
})
route.post("/poster",async(req,res)=>{
    const expertises=await Expertise.create(req.body).then((data)=>{
        console.log("posted successfully");
        res.status(200).send("posted successfully")
    })
    .catch((err)=>{
        console.log(err);
        console.log("there is an error in posting Expertise");
        res.status(404).send("error in posting Expertise");
    })
})
module.exports=route;