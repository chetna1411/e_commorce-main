const controller = require('../controllers/product_C');
const valid = require('../middlewares/validations_M');
const isAdmin = require('../middlewares/authentication_M');

module.exports = (app) =>{

    app.post("/mart/a7/category/products",[valid.validPro,isAdmin.validUser,isAdmin.isAdmin],controller.create);
    app.get("/mart/a7/category/products",controller.find);
    app.put("/mart/a7/category/products/:id",[valid.validPro,isAdmin.validUser,isAdmin.isAdmin],controller.update);
    app.delete("/mart/a7/category/products/:id",[isAdmin.validUser,isAdmin.isAdmin],controller.delete);
    
}