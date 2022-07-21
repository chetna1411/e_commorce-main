
const db = require('../models');
const Cart = db.cart;
const Product = db.product;

// Handler for create carts
exports.create = (req,res)=>{

    const userId = req.userId;
    // here empty cart is created 
    Cart.create(userId).then(carts=>{
        res.status(201).send(carts)
    }).catch(err=>{
        res.status(500).send({
            message : "Internal Error happened"
        });
    });
}

// Handler for Update carts
exports.update = (req,res)=>{
    const cartId = req.params.id;

    Cart.findByPk(cartId).then(carts=>{
        // Add the product passed in the req body to the cart
        var productIds = req.body.productIds
        Product.findAll({
            where : {
                id : productIds
            }
        }).then(products =>{
            // if no any products
            if(!products){
                res.status(400).send({
                    message : "Product trying to add doesn't exist"
                });
                return;
            }
            // Set these products inside the Cart
            carts.setProducts(products).then(()=>{  
                console.log("Products succesfully added to the cart");
                var cost = 0;
                var productSelected = [];    // user put many product in cart

                carts.getProducts().then(cartProducts =>{  
                    for(let i=0; i<cartProducts.length; i++){
                        productSelected.push({
                            id : cartProducts[i].id,
                            name : cartProducts[i].name,
                            price : cartProducts[i].price
                        });
                        cost = cost + cartProducts[i].price;
                    }
                    // I am ready to return the updated cart

                    res.status(200).send({
                        id : carts.id,
                        productSelected : productSelected,
                        cost : cost
                    })
                })
            })
        })
    }).catch(err=>{
        res.status(500).send({
            message : "Error while updating carts !"
        });
    });
}

// Handler for Delete cart

