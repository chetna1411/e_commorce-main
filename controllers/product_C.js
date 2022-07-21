const db = require('../models');
const Product = db.product;

// Create Projects

exports.create = (req,res)=>{
    const body = {
        name : req.body.name,
        price : req.body.price,
        details : req.body.details,
        categoryId : req.body.categoryId       // the product is create in which category
    };
    Product.create(body).then(products=>{
        res.status(201).send(products);
    }).catch(err=>{
        res.status(500).send({
            message : "Oops internal problems"
        });
    });
};

// Find Products by name

exports.find = (req,res)=>{
    // i should apply the name filter
    // by query param like get('/products?name=tata') 
    let params = req.query.name;
    let promis;
    if(params){  //then all only tata product shows as output
        promis = Product.findAll({where:{
            name : params
        }})
    }
    else{     // all product show
        promis = Product.findAll()      
    }
    // promis always return somthing eigther fullfilled or failed
    promis.then(products=>{
        res.status(200).send(products)
    }).catch(err=>{
        res.status(500).send({
            message : "Product files Error !"
        });
    });
};

// Update Products
exports.update = (req,res)=>{
    let body = {
        name : req.body.name,
        price : req.body.price,
        details : req.body.details       
    };
    let byId = req.params.id;
    Product.update(body,{where:
                            {id : byId},
                        returning : true }).then(()=>{
        res.status(201).send({
            message : "Updated"
        });
    }).catch(err=>{
        res.status(500).send({
            message : "Somthing is wrong in updation"
        });
    });
};

// Delete Product by Id

exports.delete = (req,res)=>{
    const byID = req.params.id;
    Product.destroy({where:{ id:byID }}).then(()=>{
        res.status(201).send({
            message : "Deleted"
        });
    }).catch(err=>{
        res.status(500).send({
            message : "Error in Deletion"
        });
    });
}