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
const accessoire=new schema({
    id:String,
    email:String,
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
const Accessoire=mongoose.model('Accessoire',accessoire);
module.exports=Accessoire;