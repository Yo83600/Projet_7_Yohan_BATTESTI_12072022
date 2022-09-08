const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

/* Gestion des fichiers entrants dans les requêtes HTTP */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.fieldname === "image") callback(null, "images/posts/");
    else if (file.fieldname === "profil_image") callback(null, "images/profil/");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage});