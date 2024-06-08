const express=require('express');
const route=express.Router();
const Demande=require('../models/demande_modele');
route.get('/demandes',async(req,res)=>{
    const demandes=await Demande.find().then((data)=>{
        console.log(data);
        console.log('all demandes listed successfully');
        res.status(200).json(data)
    })
    .catch((err)=>{
        console.log(err);
        console.log('error in listing all demandes')
        res.status(400).send('error in listing all demandes')
    })
})
route.get('/unique/:id',async(req,res)=>{
    const demande=await Demande.findOne({_id:req.params.id}).then((data)=>{
        console.log(data)
        console.log('finded successfully')
        res.status(200).json(data)
    })
    .catch((err)=>{
        console.log(err)
        res.status(404).json({'err':'error in finding this demande'})
    })
})
route.post('/poster',async(req,res)=>{
    const demandes=await Demande.create(req.body).then((data)=>{
        console.log(data)
        console.log('posted successfully')
        res.status(200).json({ message: 'posted successfully' });
    })
    .catch((err)=>{
console.error("erreur lors de creation de demande")
res.status(404).json({ error: 'error in posting demandes' });
    })
})
route.get("/nontouch",async(req,res)=>{
    const demandes=await Demande.find({touched:false}).then((data)=>{
        console.log(data)
        console.log('finded successfully')
        res.status(200).json(data);
    })
    .catch((err)=>{
        console.log('error in in finding intouchable demandes')
        console.log(err)
        res.status(404).json({err:'error in finding intouchable demandes'})
    })
})
route.put('/valider/:id',async(req,res)=>{
    const demande=await Demande.updateOne({_id:req.params.id},{touched:true,approuved:true})
    .then((data)=>{
        console.log('updated successfuly')
        res.status(200).send('updated successfully')
    })
    .catch((err)=>{
        console.log(err)
        console.log("error in updating")
        res.status(404).send("error in updating demande");
    })
})
route.put('/refuser/:id',async(req,res)=>{
    const demande=await Demande.updateOne({_id:req.params.id},{touched:true,approuved:false})
    .then((data)=>{
        console.log('updated successfuly')
        res.status(200).send('updated successfully')
    })
    .catch((err)=>{
        console.log(err)
        console.log("error in updating")
        res.status(404).send("error in updating demande");
    })
})
module.exports=route;