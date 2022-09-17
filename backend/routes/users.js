// Mise en place des routes concernant la gestion des users ---------------------------------------------------------------------
const express = require('express'); 
const router = express.Router(); 
const rateLimit = require("express-rate-limit");
const multer = require("../middleware/multer-config");
const checkPassword = require('../middleware/check-password');

const userCtrl = require('../controllers/users') // Utilisation du controlleur User
const auth = require('../middleware/auth')

// limite le nombre de requete 
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
});

// limite le nombre de requete 
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure window
  max: 10, // blocker après 5 requete
  message:
    "trop de compte créér avec cette ip, essayer dans 1 heure",
});

router.post('/signup',createAccountLimiter,checkPassword, userCtrl.signup); // Création d'un nouvel user avec contrôle du format de password
router.post('/login',apiLimiter, userCtrl.login);
router.get('/:id',auth, userCtrl.getOneUser);
router.put('/:id',auth, multer.single("profil_image"),userCtrl.modifyUser);

module.exports = router; // Exportation du router