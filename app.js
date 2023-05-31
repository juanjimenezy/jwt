const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

app.get("/api",(req , res)=>{
    res.json({
        message: "Node y Json Web Token"
    })
});

app.post("/api/login",(req , res)=>{
    let user = {nombre : req.body.nombre,email : req.body.email}
    jwt.sign({user}, 'secretkey', (err, token)=>{
        res.json({
            token
        })
    })

});

app.post("/api/posts", tokenVerify, (req , res)=>{ 
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                message: "Exitoso.",
                authData
            })
        }
    })
});

function tokenVerify(req, res, next){

 const bearerHeader =  req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(8080, function(){
   console.log("nodejstws is running...");
});