const dbConfig = require("../config/db.config.js");
// const user = require('../models/user.js')

const {Sequelize , DataTypes} = require("sequelize")

const sequelize = new Sequelize(dbConfig.database,dbConfig.username,dbConfig.password,{dialect : dbConfig.dialect, host : dbConfig.host})

sequelize.authenticate().then((console.log("connexion a la bdd")))
.catch(error => console.log(error))

// sequelize.sync({force : true})
// .then((console.log("Bdd créé")))
// .catch(error => console.log(error))

module.exports = sequelize;