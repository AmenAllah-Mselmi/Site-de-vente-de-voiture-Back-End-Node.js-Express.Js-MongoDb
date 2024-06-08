const jwt=require('jsonwebtoken')
const AuthHandler=(req,res,next)=>{
    const token=req.cookies.jwt
    if(token){
        jwt.verify(token,'shhhhh',(err)=>{
            if(err){
                res.send('you have an error')
            }
            else{
                next()
            }
        })
    }
    else{
        res.send('create an account to pass')
    }
}
module.exports=AuthHandler;