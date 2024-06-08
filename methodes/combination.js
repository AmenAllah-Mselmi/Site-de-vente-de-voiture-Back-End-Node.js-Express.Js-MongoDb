const express=require('express');
const route=express.Router();
const Voiture=require('../models/voiture_model');
const Autre=require('../models/model_autre');
const Accessoire=require('../models/accessoires_model');
const Location=require('../models/model_location');
const Moto=require('../models/moto_model');
const User=require('../models/user_model');
const Camion=require('../models/camion_model');
route.get('/region/:region', async (req, res) => {
    try {
        const region = req.params.region;

        // Récupérer les données de tous les modèles pour la région spécifique
        const autres = await Autre.find({ Region: region });
        const locations = await Location.find({ Region: region });
        const voitures = await Voiture.find({ Region: region });
        const camions = await Camion.find({ Region: region });
        const motos = await Moto.find({ Region: region });
        const accessoires = await Accessoire.find({ region: region });

        // Concaténer les résultats de tous les modèles dans un seul tableau
        const resultats = [...autres, ...locations, ...voitures, ...camions, ...motos, ...accessoires];

        // Retourner le tableau d'objets JSON
        res.json(resultats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des données." });
    }
});
module.exports=route;