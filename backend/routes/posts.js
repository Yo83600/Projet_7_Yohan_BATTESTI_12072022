const express = require('express');
const router = express.Router();
const multer = require("../middleware/multer-config");

const postCrtl = require('../controllers/posts');
const likeCrtl = require('../controllers/likes');
const auth = require('../middleware/auth')

// différentes routes pour les posts 

router.post('/',auth,multer, postCrtl.createPost);

router.put('/:id',auth,multer, postCrtl.modifyPost);

router.delete('/:id',auth, postCrtl.deletePost);

router.get('/:id',auth, postCrtl.getOnePost);

router.get('/',auth, postCrtl.getAllPost);

router.post('/:id/like', auth, likeCrtl.likePost);

module.exports = router;