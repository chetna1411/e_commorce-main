module.exports = (sequelize, Sequelize)=>{
    const Category = sequelize.define('categories',{
        name : {
            type : Sequelize.STRING
        },
        title : {
            type : Sequelize.STRING
        }
    });
    return Category;
};