const express = require('express');
const app = express();  // for create server inverment

const bodyParser = require('body-parser');
app.use(bodyParser.json());  // convert data js obj to json

const db = require('./models');
db.sequelize.sync({force:true}).then(()=>{
    createRole();
    console.log("tables are created on db");
}).catch(err=>{
    console.log(err);
})

// here i am creating roles direct because this constant(never change) part of application
const Role = db.role;
function createRole(){
    Role.create({
        id : 1,
        role : 'admin'
    })
    Role.create({
        id : 2,
        role : 'customer'
    })
}
// calling all routes with the help express 
require('./routes/category_API')(app);
require('./routes/product_API')(app);
require('./routes/user_API')(app);
require('./routes/carts_API')(app);
//require('./routes/');

// The server is running on port no 7070  (localhost:7070/)
app.listen(7070,()=>{ 
    console.log(" Server is started ");
});