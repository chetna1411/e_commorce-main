const db = require('../models');
const Category = db.category;

exports.create = (req,res) =>{
    const body = {
        name : req.body.name,
        title : req.body.title
    };
    Category.create(body).then(categories=>{
        res.status(201).send(categories);
    }).catch(err=>{
        res.status(500).send({
            message : "Oops internal problems"
        });
    });
}

exports.find = (req,res)=>{
    const param = req.query.name;
    let promis;
    if(param){
        promis = Category.findAll({where :{
                                    name : param
        }})
    }else{
        promis = Category.findAll()
    }
    promis.then(categories=>{
        res.status(200).send(categories)
    }).catch(err=>{
        res.status(500).send({
            message : "Internal Error !"
        });
    });
};

exports.update = (req,res)=>{
    const byId = req.params.id;
    const Catbody = {
        name : req.body.name,
        title : req.body.title       
    };
    Category.update(Catbody,{where :{
                                id : byId
                            },returning : true }).then(()=>{
                                res.status(201).send({
                                    message : "Category Updated"
                                });
                            }).catch(err=>{
                                res.status(500).send({
                                    message : "Error in Updation"
                                });
                            });
}

exports.delete = (req,res)=>{
    const byId = req.params.id;
    Category.destroy({where : { id: byId}}).then(()=>{
        res.status(201).send({
            message : "Category Deleted"
        });
    }).catch(err=>{
        res.status(500).send({
            message : "Error in Deletion"
        });
    });
}