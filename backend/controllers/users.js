const User = require("../models/user"); // Récupération des modèles Sequelize
const bcrypt = require("bcrypt"); // Bcrypt permet de crypter le password et de le comparer

// Gestion de la création d'un utilisateur et cryptage du mot de passe  ---------------------------------------------------------------
exports.signup = (req, res, next) => {
   console.log(req.body)
  //  res.status(201).json({ message: "Je suis un guignole!" })
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        admin: false,
      })

        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))

        .catch((error) => res.status(400).json({ error , message: "Problème Requet" }));
    })

    .catch((error) => res.status(500).json({ error , message: "Problème mdp"}));
};
