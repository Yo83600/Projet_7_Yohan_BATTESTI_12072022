// Mise en place des routes concernant la gestion des users ---------------------------------------------------------------------
const express = require('express'); 
const router = express.Router(); 

const userCtrl = require('../controllers/users') // Utilisation du controlleur User

router.post('/signup', userCtrl.signup); // Création d'un nouvel user avec contrôle du format de password

module.exports = router; // Exportation du router