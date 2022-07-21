const jwt = require('jsonwebtoken');
const db = require('../models');
const key = db.secrate;
const User = db.user;

const validToken = (req,res,next)=>{
    let header = req.headers['x-access-token'];
    if(!header){
        res.status(401).send({
            message : " Enter Access Token "
        })
        return;
    }
    if(header){
        jwt.verify(header,key,(err,decodeToken)=>{
            if(err){
                res.status(401).send({
                    message : " Please Enter Valid Acsess Token "
                })
                return; 
            }
            req.userId = decodeToken.id;
            next();
        })
    }
}

const isAdmin = (req,res,next)=>{
    User.findByPk(req.userId).then(users=>{
        users.getRoles().then(roles=>{
            for(let i=0; i<roles.length; i++){
                if(roles[i].role == 'admin'){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message : "Sorry ,Only Admin allow !"
            })
            return;
        })
    })
}

module.exports = {
    validUser : validToken,
    isAdmin : isAdmin
}