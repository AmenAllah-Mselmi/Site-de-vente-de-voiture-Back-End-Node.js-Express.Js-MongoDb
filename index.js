const express=require('express');
const app=express();
const path=require('path');
const CookieParser=require('cookie-parser')
app.use(CookieParser())
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'middlewares')))
app.use(express.static(path.join(__dirname,'methodes')));
app.use(express.static(path.join(__dirname,'models')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
const voiture=require('./methodes/voiture');
const moto=require('./methodes/moto');
const location=require('./methodes/location');
const accessoire=require('./methodes/accessoire');
const autre=require('./methodes/autre');
const camion=require('./methodes/camion');
const user=require('./methodes/user');
const comb=require('./methodes/combination');
const demande=require('./methodes/demande')
const expertise=require('./methodes/expertise');
app .use('/combination',comb);
app.use('/user',user);
app.use('/voiture',voiture);
app.use('/moto',moto);
app.use('/camion',camion);
app.use('/location',location);
app.use('/accesssoire',accessoire);
app.use('/autre',autre);
app.use('/demande',demande);
app.use('/expertise',expertise);
app.listen(3000,()=>{
    console.log("the server is working");
})