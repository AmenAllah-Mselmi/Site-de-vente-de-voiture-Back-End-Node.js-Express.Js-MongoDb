const express=require('express');
const route=express.Router();
const Voiture=require('../models/voiture_model');
const { find } = require('../models/user_model');
route.get('/voitures',(req,res)=>{
    Voiture.find().then((data)=>{
        res.json(data);
    })
    .catch(err => {
        console.error('Erreur lors de la recherche des Voitures :', err);
        res.status(500).send('Erreur lors de la recherche des Voitures');
    });
    })
    // GET request to retrieve all documents with marque "audi"
route.get('/marque/:id', async (req, res) => {
    try {
        const audiCars = await Voiture.find({ Marque: req.params.id });
        res.json(audiCars);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
route.get('/marque/:id', async (req, res) => {
    try {
        const audiCars = await Voiture.find({ Marque: req.params.id });
        res.json(audiCars);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
route.get('/region/:id', async (req, res) => {
    try {
        const audiCars = await Voiture.find({ Region: req.params.id });
        res.json(audiCars);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
route.get('/search/:region/:txt', async (req, res) => {
    try {
        const searchString=req.params.txt;
        const Cars = await Voiture.find({ Region: req.params.region,TitreAnnonce:{ $regex: '^' + searchString, $options: 'i' } });
        res.json(Cars);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
route.get('/menu/:id',async (req,res)=>{
try{
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid menu ID' });
    }
    const lastItems = await Voiture.find().sort({ createdAt: -1 }).limit(id);
    res.status(200).json(lastItems);
}
catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
}
})

// Récupérer les détails de chaque voiture et les sauvegarder
route.get('/unique/:id',async(req,res)=>{
    const voiture=await Voiture.findOne({
        _id:req.params.id})
        .then((data)=>{
            res.status(200).json(data);
            console.log('finded successfully');
        })
        .catch((err)=>{
            console.log(err);
            res.status(404).send('error in finding this car');
        })
})
route.post('/create',async(req,res)=>{
    const signup=await Voiture.create(req.body).then((result)=>{
        console.log(result);
        res.send('Camion created successfully');
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).send('error in creating Camion');
    })
})
route.get('/total/:email',async(req,res)=>{
    const voitures=await Voiture.find({email:req.params.email}).then((data)=>{
        console.log(data)
    res.status(200).json(data)
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).send('error in finding cars by email')
    })
})
route.delete('/delete/:id',async(req,res)=>{
    const voitures=await Voiture.deleteOne({_id:req.params.id}).then((data)=>{
        
    res.status(200).json('deleted successfully')
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).send('error in deleting')
    })
})
route.put('/put/:id', async (req, res) => {
    
        const voiture = await Voiture.updateOne({_id:req.params.id},req.body).then((data)=>{
            console.log('updated successfully');
            res.status(200).json('Updated successfully');
        })
        .catch((err)=>{
            console.log(err);
            res.status(404).json('Error in updating')
        })
});
route.get('/search/:txt', async (req, res) => {
    try {
        const searchString=req.params.txt;
        const Cars = await Voiture.find({ TitreAnnonce:{ $regex: '^' + searchString, $options: 'i' } });
        res.json(Cars);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
module.exports=route;