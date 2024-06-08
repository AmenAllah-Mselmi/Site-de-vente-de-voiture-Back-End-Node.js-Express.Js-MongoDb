const mongoose=require('mongoose');
const url='mongodb://localhost:27017/Baniola';
mongoose.connect(url)
.then(()=>{
    console.log('connected to the database');
})
.catch(()=>{
    console.log('There is an error in the Data Base');
});
const schema=mongoose.Schema;
const voiture=new schema({
    id:String,
    email:String,
    Modele:String,
    puissanceFiscale:String,
    MiseCirculation:String,
    NombrePortes:Number,
    kilometrage:Number,
    EtatVehicule:String,
    Marque:String,
    BoiteVitesse:String,
    Cylindree:String,
    Typecarburant:String,
    JantesAluminium:Boolean,
    ABS:Boolean,
    DirectionAssistée:Boolean,
    Climatisation:Boolean,
    ESP:Boolean,
    VitresElectriques:Boolean,
    SystèmeDeNavigation:Boolean,
    FemtureCentrale:Boolean,
    Airbags:Boolean,
    MP3Bluetooth:Boolean,
    RadarDeRecul:Boolean,
    Antipatinage:Boolean,
    LimiteurDeVitesse:Boolean,
    ToitOuvrant:Boolean,
    RégulateurDeVitesse:Boolean,
    TitreAnnonce:String,
    Description:String,
    Region:String,
    Delegation:String,
    Prix:String,
    Telephone:String,
    AffichageTel:Boolean,
    AffichagePrix:Boolean,
    image:String
});
const Voiture=mongoose.model('Voiture',voiture);
module.exports=Voiture;