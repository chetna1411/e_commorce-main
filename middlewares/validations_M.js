// here i am requesting to user to fill valid input
const db = require('../models');
const Category = db.category;
const Product = db.product;

const validCategory = (req,res,next) =>{
    if(!req.body.name){
        res.status(402).send({
            message : "Enter Category Name"
        })
        return;
    }
    next();
}

const validProduct = (req,res,next) =>{
    if(!req.body.name){
        res.status(402).send({
            message : "Enter Product Name"
        })
        return;
    }
    if(req.body.price < 0 || ! req.body.price){
        res.status(402).send({
            message : "Enter base price of product"
        })
        return;
    }
    let catId = req.body.categoryId
    if(! catId){
        res.status(402).send({
            message : "Please Enter Category ID"
        })
        return;
    }
    if(catId){
        Category.findByPk(catId).then(cat=>{
            if(!cat){
                res.status(404).send({
                    message : "Category Id is Not valid, Please Enter Valid Id"
                })
                return;
            }
            next();
        }).catch(err=>{
            res.status(500).send({
                message : "Oops Error !"
            })
        })
    }
}
const validCart = (req,res,next) =>{
    if(!req.req.userId){
        res.status(402).send({
            message : "Enter userId"
        })
        return;
    }
}

module.exports ={
    validCat : validCategory,
    validPro : validProduct,
    validCart : validCart
};