const express=require('express');
const route=express.Router();
const Moto=require('../models/moto_model');
route.get('/motos',(req,res)=>{
    Moto.find().then((data)=>{
        res.json(data);
    })
    .catch(err => {
        console.error('Erreur lors de la recherche des Motos :', err);
        res.status(500).send('Erreur lors de la recherche des Motos');
    });
    })
    route.get('/region/:id', async (req, res) => {
        try {
            const audiCars = await Moto.find({ Region: req.params.id });
            res.json(audiCars);
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
            const lastItems = await Moto.find().sort({ createdAt: -1 }).limit(id);
            res.status(200).json(lastItems);
        }
        catch(err){
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        })
        route.get('/unique/:id',async(req,res)=>{
            const voiture=await Moto.findOne({
                _id:req.params.id})
                .then((data)=>{
                    res.status(200).json(data);
                    console.log('finded successfully');
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(404).send('error in finding this scooter');
                })
        })
        route.post('/create',async(req,res)=>{
            const signup=await Moto.create(req.body).then((result)=>{
                console.log(result);
                res.send('Moto created successfully');
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).send('error in creating Moto');
            })
        })
        route.get('/total/:email',async(req,res)=>{
            const motos=await Moto.find({email:req.params.email}).then((data)=>{
                console.log(data)
            res.status(200).json(data)
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).send('error in finding motos by email')
            })
        })
        route.delete('/delete/:id',async(req,res)=>{
            const motos=await Moto.deleteOne({_id:req.params.id}).then((data)=>{
                
            res.status(200).json('deleted successfully')
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).send('error in deleting')
            })
        })
        route.put('/put/:id', async (req, res) => {
    
            const voiture = await Moto.updateOne({_id:req.params.id},req.body).then((data)=>{
                console.log('updated successfully');
                res.status(200).json('Updated successfully');
            })
            .catch((err)=>{
                console.log(err);
                res.status(404).json('Error in updating')
            })
    });
    route.get('/search/:region/:txt', async (req, res) => {
        try {
            const searchString=req.params.txt;
            const Motos = await Moto.find({ Region: req.params.region,TitreAnnonce:{ $regex: '^' + searchString, $options: 'i' } });
            res.json(Motos);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
    route.get('/search/:txt', async (req, res) => {
        try {
            const searchString=req.params.txt;
            const Motos = await Moto.find({ TitreAnnonce:{ $regex: '^' + searchString, $options: 'i' } });
            res.json(Motos);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
module.exports=route;