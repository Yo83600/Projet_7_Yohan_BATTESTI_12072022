// Mise en place des routes concernant la gestion des users ---------------------------------------------------------------------
const express = require('express'); 
const router = express.Router(); 

const userCtrl = require('../controllers/users') // Utilisation du controlleur User
const auth = require('../middleware/auth')

router.post('/signup', userCtrl.signup); // Création d'un nouvel user avec contrôle du format de password
router.post('/login', userCtrl.login);
router.get('/:id',auth, userCtrl.getOneUser);
router.put('/:id',auth, userCtrl.modifyUser);

module.exports = router; // Exportation du router