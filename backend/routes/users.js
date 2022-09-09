// Mise en place des routes concernant la gestion des users ---------------------------------------------------------------------
const express = require('express'); 
const router = express.Router(); 
const multer = require("../middleware/multer-config");
const checkPassword = require('../middleware/check-password');

const userCtrl = require('../controllers/users') // Utilisation du controlleur User
const auth = require('../middleware/auth')

router.post('/signup',checkPassword, userCtrl.signup); // Création d'un nouvel user avec contrôle du format de password
router.post('/login', userCtrl.login);
router.get('/:id',auth, userCtrl.getOneUser);
router.put('/:id',auth, multer.single("profil_image"),userCtrl.modifyUser);

module.exports = router; // Exportation du router