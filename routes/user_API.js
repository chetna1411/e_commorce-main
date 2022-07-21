const controller = require('../controllers/user_C');
const duplicate = require('../middlewares/duplicateUsers_M');

module.exports = (app) =>{
    app.post("/mart/a7/users/signup",[duplicate.duplicate],controller.signup);
    app.post("/mart/a7/users/signin",controller.signin);
}