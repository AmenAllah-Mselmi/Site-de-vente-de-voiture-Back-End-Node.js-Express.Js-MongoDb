const express=require('express');
const route=express.Router();
const User=require('../models/user_model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const middleware=require('../middlewares/auth');

route.get('/users',(req,res)=>{
User.find().then((data)=>{
    res.json(data);
})
.catch(err => {
    console.error('Erreur lors de la recherche des Utilisateurs :', err);
    res.status(500).send('Erreur lors de la recherche des Utilisateurs');
});
})
route.post('/signup',async(req,res)=>{
    const signup=await User.create(req.body).then((result)=>{
        console.log(result);
        res.send('User created successfully');
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).send('error in creating user');
    })
})
route.get('/unique/:id',async(req,res)=>{
    const user=await User.findOne({
        Email:req.params.id})
        .then((data)=>{
            res.status(200).json(data);
            console.log('finded successfully');
        })
        .catch((err)=>{
            console.log(err);
            res.status(404).send('error in finding this user');
        })
})
route.post('/login',async (req,res)=>{
    const user=await User.findOne({Email:req.body.Email});
    console.log(user);
    if(user===null){
        res.send(`this email doesn't exist`)
        console.log("dont exist")
    }
    else{
        const match = await bcrypt.compare(req.body.Password, user.Password);
        if(match){
            // res.send('this user exist in the Database')
            var token = jwt.sign({ id:user._id,Email:user.Email,NomPrenom:user.NomPrenom,Role:user.Role }, 'shhhhh');
            // res.cookie('jwt',token,{httpOnly:true,maxAge:846000000})
            // res.send('the user exist welcome to our page')
            res.status(200).send({token:token});
        }
        else{
            res.send('this is a wrong password')
        }
    }
})
route.delete('/delete/:id',async(req,res)=>{
    const user=await User.deleteOne({_id:req.params.id}).then((data)=>{
        console.log(data)
        console.log('usesr successfully deleted')
    })
    .catch((err)=>{
        console.log(err)
        console.log('there is is an error in deleting this user')
    })
})
route.get('/experts',async(req,res)=>{
    const role1="Expert" 
    const role2="Admin"
const expert=await User.find({Role:{$in:[role1,role2]}}).then((data)=>{
    console.log('this is the list of experts in the Data base');
    res.status(200).json(data)
})
.catch((err)=>{
    console.log(err)
    console.error('there is an error in listing  experts')
})
})
route.put('/updateRole/:email',async(req,res)=>{
    const role='Expert'
const update=await User.updateOne({Email:req.params.email},{Role:role}).then((data)=>{
    console.log(data)
    res.status(200).send('updated successfully')
    console.log('updated successfully')
})
.catch((err)=>{
    console.log(err)
    console.error('there is an error updating to expert ')
})
})
module.exports=route;