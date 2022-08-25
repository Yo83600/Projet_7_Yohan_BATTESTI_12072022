const User = require("../models/user"); // Récupération des modèles Sequelize
const bcrypt = require("bcrypt"); // Bcrypt permet de crypter le password et de le comparer
const jwt = require('jsonwebtoken')

// Gestion de la création d'un utilisateur et cryptage du mot de passe  ---------------------------------------------------------------
exports.signup = (req, res, next) => {
  //console.log(req.body)
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

/* Connexion par mot de passe */
exports.login = (req, res, next) => {
  console.log(req.body)
  User.findOne({  where: {
      email: req.body.email,
    }, })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur ou mot de passe non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Utilisateur ou mot de passe incorrect !' });
          }
          res.status(200).json({
            name : user.username,
            userId: user.id,
            token: jwt.sign(
                { userId: user.id},
                 process.env.SECRET_TOKEN,
                { expiresIn: '24h'}
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
