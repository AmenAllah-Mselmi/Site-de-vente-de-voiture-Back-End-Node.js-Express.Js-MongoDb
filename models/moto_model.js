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
const moto=new schema({
    id:String,
    kilometrage:Number,
    email:String,
    EtatVehicule:String,
    AnneeModele:String,
    Marque:String,
    BoiteVitesse:String,
    Cylindree:String,
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
const Moto=mongoose.model('Moto',moto);
module.exports=Moto;