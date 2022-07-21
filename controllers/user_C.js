const db = require('../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = db.secrate;

exports.signup = (req,res) =>{
    const userBody = {
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8)  // hashing password
    }
    User.create(userBody).then(users=>{
        if(req.body.role){
            Role.findOne({where : {
                role : {
                    [Op.or] : req.body.role
                }
            }}).then(role=>{
                users.setRoles(role).then(roles=>{
                    res.status(201).send({
                        message : users.username + " Registration SuccessFul"
                    })
                })
            })
        }
        else{
            users.setRoles([2]).then(roles=>{
                res.status(201).send({
                    message : users.username + " Registration SuccessFul"
                })
            })
        }
    }).catch(err=>{
        res.status(201).send({
            message : "Internal Error"
        });
    });
};

exports.signin = (req,res)=>{
    const emailId = req.body.email;
    User.findOne({where : { email : emailId}}).then(users=>{
        if(!users){
            res.status(401).send({
                message : " Email not valid, Please enter valid email ! "
            })
            return;
        }
        var pass = bcrypt.compareSync(req.body.password,users.password); // compair with current password and in db password
        if(!pass){
            res.status(401).send({
                message : " Wrong password, Please enter valid password ! "
            })
            return;
        }
        var valilationToken = jwt.sign({id : users.id},key,{expiresIn : 200});
        var auth = [];
        users.getRoles().then(roles=>{
            for(let i=0; i<roles.length; i++){
                auth.push(" "+roles[i].role);
            }
            res.status(200).send({
                message : `Welcome To {A} Mart, ${users.username} `,
                roles : auth,
                accessToken : valilationToken
            })
        })
    }).catch(err=>{
        res.status(500).send({
            message : " Somthing is wrong "
        });
    });
}