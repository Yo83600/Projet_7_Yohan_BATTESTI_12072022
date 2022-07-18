const Sequelize = require("sequelize")

const sequelize = new Sequelize('projet7','root','',{dialect : 'mysql', host : 'localhost'})

module.exports = sequelize;