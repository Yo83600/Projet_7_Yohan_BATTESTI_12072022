const {Sequelize , DataTypes} = require('sequelize')
const sequelize = require("../db/db.js");

// Création du modèle User qui servira à alimenter la table Users dans notre BDD --------------------------------------
// module.exports = (sequelize, Sequelize) => {
const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, // Utilisation d'un regex pour le format d'adresse mail
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  });

module.exports = User;