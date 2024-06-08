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
const expertise=new schema({
    idannonce:String,
    NomPrenom:String,
    Region:String,
    idExpert:String,
    email:String
})
const Expertise=mongoose.model('Expertise',expertise);
module.exports=Expertise;