const {Sequelize , DataTypes} = require('sequelize')
const sequelize = require("../db/db.js");

// Création du modèle User qui servira à alimenter la table Users dans notre BDD --------------------------------------
// module.exports = (sequelize, Sequelize) => {
const Like = sequelize.define("like", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  });

module.exports = Like;