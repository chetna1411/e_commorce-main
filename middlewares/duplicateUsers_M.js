const db = require('../models');
const User = db.user;
const isDuplicate = (req,res,next)=>{
    let emailId = req.body.email;
    if(emailId){
        User.findOne({where : {  // this async call 
            email : emailId
        }}).then(users=>{
            if(users){
                res.status(200).send({
                    message : "email already exist"
                })
                return;
            }
            next();
        })
    }
}

module.exports = {
    duplicate : isDuplicate
};