const controller = require('../controllers/cart_C');
const validUser = require('../middlewares/authentication_M')
module.exports = (app) =>{

    app.post("/mart/a7/carts",[validUser.validUser],controller.create);
    app.put("/mart/a7/carts/:id",controller.update);
    
}