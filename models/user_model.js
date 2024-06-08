const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const url='mongodb://localhost:27017/Baniola';
const validator=require('validator');
mongoose.connect(url)
.then(()=>{
    console.log('connected to the database');
})
.catch(()=>{
    console.log('There is an error in the Data Base');
});
const schema=mongoose.Schema;
const user=new schema({
    id:String,
    NomPrenom:String,
    Region:String,
    Email:{
        type:String,
        unique:true,
        lowercase:true,
        required:[true,'Please Enter an Email'],
        validate:[validator.isEmail,'Please enter a valid email']
    },
    Password:{
        type:String,
        required:[true,"please enter a password"],
        minlength:[6,'minimum length password is 6']
    },
    image:String,
    Role:String
});
user.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.Password=await bcrypt.hash(this.Password,salt);
    next();
})
const User=mongoose.model('User',user);
module.exports=User;