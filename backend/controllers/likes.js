const db = require("../models"); // Récupération des modèles Sequelize

// Ajout d'un like et suppression de ce dernier si il est déjà présent -----------------------------------

exports.likePost = (req, res, next) => {
   console.log(req.auth.userId , req.params ,req.params.id)

    const userLike = db.Like.findOne({
      // On vérifie si un like est déjà présent
      where: {
        userId: req.auth.userId,
        postId: req.params.id,
      },
    }).then(userLike => {

      console.log(userLike)
      
      if (userLike) {
      // Si oui on le supprime de la BDD
      db.Like.destroy(
          {
            where: {
              userId: userLike.userId,
              postId: userLike.postId,
            },
          }
        ).then( () => {
          res.status(200).json({ message: "Post disliké" });
        }).catch((error) => {
            error
        });
        
      } else {
        // Sinon on le rajoute
        db.Like.create({
          userId: req.auth.userId,
          postId: req.params.id,
        });
        res.status(201).json({ messageRetour: "Post liké" });
      }
    
    }).catch ( (error) => {
      res.status(500).json({ error });
    });
};