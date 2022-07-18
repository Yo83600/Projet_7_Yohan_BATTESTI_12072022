const express = require('express');
const app = express();

const Db = require("./db/db.js")

Db.sync().then((console.log("connexion a la bdd")))
.catch(error => console.log(error))

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;