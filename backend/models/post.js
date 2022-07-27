const {Sequelize , DataTypes} = require('sequelize')
const sequelize = require("../db/db.js");

// Création du modèle User qui servira à alimenter la table Users dans notre BDD --------------------------------------
// module.exports = (sequelize, Sequelize) => {
const Post = sequelize.define("post", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    message: {
      type: Sequelize.TEXT, // Aucune limite de caractères contrairement à STRING
      allowNull: false,
    },

    imageURL: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

module.exports = Post;