const express = require('express');
const app = express();
require('dotenv').config();


const Db = require("./db/db.js");
// const User = require("./models/user.js")
const models = require("./models/")
// console.log(db)

Db.sync({force : false})
.then((console.log("Bdd créé")))
.catch(error => console.log(error))

const userRoutes = require('./routes/users.js');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

// app.use((req, res) => {
//    res.json({ message: 'Votre requête a bien été reçue !' }); 
// });


app.use('/api/auth', userRoutes);


module.exports = app;