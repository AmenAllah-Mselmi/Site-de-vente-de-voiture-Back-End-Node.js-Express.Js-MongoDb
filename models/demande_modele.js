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
const demande=new schema({
    lettre_de_motivation:String,
    permis:String,
    Formation:String,
    Nb_Voiture_vendus:Number,
    approuved:Boolean,
    touched:Boolean,
    email:String
})
const Demande=mongoose.model('Demande',demande);
module.exports=Demande;