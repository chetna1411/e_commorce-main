const config = require('../configs/config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,{
        host : config.HOST,
        dialect : config.dialect,
        pool : {
            max : config.pool.max,
            min : config.pool.min,
            acquir : config.pool.acquir,
            idle : config.pool.idle
        }
    }
);

const db  = {};  // create object and with the help of this Obj use models file data every where

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.product = require('./product_m')(sequelize, Sequelize);
db.category = require('./categories_m')(sequelize, Sequelize);
db.user = require('./user_m')(sequelize, Sequelize);
db.role = require('./role_m')(sequelize, Sequelize);
db.secrate = "KEY";   // with the help of this key we provide access-token for our web-site
db.cart = require('./cart_m')(sequelize, Sequelize)

////   ->  Relationship between tables   <-    ///////
// Relation between categories to products (One 2 Many) A category has many products
db.category.hasMany(db.product);

// Relation between users to roles  (M-2-M) these two tables has many to many relations
db.user.belongsToMany(db.role,{
    through : 'user_role',
    foreginKey : 'userId',
    otherKey : 'roleId'
})
db.role.belongsToMany(db.user,{
    through : 'user_role',
    foreignKey : 'roleId',
    otherKey : 'userId'
});

//Relation between Carts and Products  (M-2-M) these two tables has many to many relations
db.product.belongsToMany(db.cart,{
    through : "carts_products",
    foreignKey : "productId",
    otherKey : "cartId"
});
db.cart.belongsToMany(db.product,{
    through : "carts_products",
    foreignKey : "cartId",
    otherKey : "productId"
});
// Relationship between user to cart (One to Many) A user has many carts
db.user.hasMany(db.cart);

module.exports = db;