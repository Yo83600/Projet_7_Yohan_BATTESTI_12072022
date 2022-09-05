const express = require('express');
const app = express();
require('dotenv').config();
const helmet = require('helmet');
const path = require('path');

const Db = require("./db/db.js");
// const User = require("./models/user.js")
const models = require("./models/")
// console.log(db)

/* Connexion à la base de donnée MySQL */
Db.sync({force : false})
.then((console.log("Bdd créé")))
.catch(error => console.log(error))

const userRoutes = require('./routes/users.js');
const postsRoutes = require("./routes/posts.js");

/* Middleware CORS - Ajout de headers à l'objet "response" */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

/* Rendre le dossier "images" statique */
app.use('/images', express.static(path.join(__dirname, 'images')));

/* lancement de helmet */
app.use(helmet());

/* Enregistrement des routes dans l'application */
app.use('/api/auth', userRoutes);
app.use('/api/posts', postsRoutes);


module.exports = app;