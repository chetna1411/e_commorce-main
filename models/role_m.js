module.exports = (sequelize, Sequelize)=>{
    const Role = sequelize.define('roles',{
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        role : {
            type : Sequelize.STRING
        }
    });
    return Role;
}