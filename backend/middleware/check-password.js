// validation du mot de passe
const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
       res.status(401).json({ message: 'Le MDP doit faire 10 caractère au moins, avec une maj, une min et un chiffre au moins.' });
    }
};