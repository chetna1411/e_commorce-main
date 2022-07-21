const controller = require('../controllers/category_C');
const validation = require('../middlewares/validations_M');
const validUser = require('../middlewares/authentication_M');

module.exports = (app) =>{
    app.post("/mart/a7/categories",[validation.validCat,validUser.validUser,validUser.isAdmin],controller.create);
    app.get("/mart/a7/categories",controller.find);
    app.put("/mart/a7/categories/:id",[validUser.validUser,validUser.isAdmin],controller.update);
    app.delete("/mart/a7/categories/:id",[validUser.validUser,validUser.isAdmin],controller.delete);
}

/// 