const Post = require("../models/post"); // Récupération des modèles Sequelize
const User = require("../models/user"); // Récupération des modèles Sequelize
const Like = require("../models/like"); // Récupération des modèles Sequelize
const fs = require("fs"); // FS est un module de Node permettant les opérations sur les fichiers


// Création d'un post ---------------------------------------------------------------------------------
exports.createPost = (req, res, next) => {
	// on cherche le user id
	User.findOne({
		attributes: ["id", "name"],
	    where: {
	      id: req.auth.userId ,
	    },
	})

	// Ajouter une image
	let imageUrl;
	if (req.file) {
		imageUrl = `${req.protocol}://${req.get("host")}/images/posts/${
          req.file.filename
        }`;
	} else {
		imageUrl = null;
	}

	console.log(req.body)
  	console.log(req.auth.userId)

	// Création du post
	Post.create({
		imageURL: imageUrl,
		message: req.body.message,
		userId: req.auth.userId ,
	})
	.then(
		() => {
			res.status(201).json({
				message: 'Post ajouté !'
			});
		}
	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
};

// Afficher tous les posts ---------------------------------------------------------------------------------
exports.getAllPost = (req, res, next) => {
	// on utilise la methode finAll pour récuperer tous les posts
	Post.findAll({
		include : [{model : User},{model : Like}],
		order : [["createdAt" , "DESC"]]
	}).then(
		(posts) => {
			res.status(200).json(posts);
		}
	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
};

// Afficher un post par son id ---------------------------------------------------------------------------------
exports.getOnePost = (req, res, next) => {
	// on recherche le post par son id
	Post.findOne({
		where: {
			id: req.params.id,
		},
	}).then(
		(post) => {
			res.status(200).json(post);
		}
	).catch(
		(error) => {
			res.status(404).json({
				error: error
			});
		}
	);
};

// Supprimer un post ---------------------------------------------------------------------------------
exports.deletePost = (req, res) => {
	//identification du demandeur
	User.findOne({
			attributes: ['id', 'name', 'admin'],
			where: {
				id: req.auth.userId,
			},
		})
		.then(user => {
			// on recherche le post par l'id
			Post.findOne({
					where: {
						id: req.params.id
					}
				})
				.then((post) => {
					//Vérification que le demandeur est soit l'admin soit le poster 
					if (post.userId == req.auth.userId || user.admin == true) {

						if (post.imageURL !== null) {
							// Si image présente on la supprime du répertoire, puis on supprime le post de la BDD
							const filename = post.imageURL.split("/images/posts/")[1];
							fs.unlink(`images/posts/${filename}`, () => {
								Post.destroy({
									where: {
										id: post.id,
									},
								}, );
								res.status(200).json({
									message: "Post supprimé !"
								});
							});
						} else { // Sinon on supprime uniquement le post
							Post.destroy({
								where: {
									id: post.id
								}
							}, );
							res.status(200).json({
								message: "Post supprimé !"
							});
						}
					} else {
						res.status(401).json({
							message: "Impossible de supprimer une publication que vous n'avez pas créér !"
						})
					}
				}).catch(err => res.status(500).json(err))
		})
		.catch(error => res.status(500).json(error));
};

// Modifier un post ---------------------------------------------------------------------------------
exports.modifyPost = (req, res, next) => {
    let newImageUrl;
    User.findOne({
            attributes: ['id', 'name', 'admin'],
            where: {
                id: req.auth.userId,
            },
        })
        .then(user => {
            Post.findOne({
                where: {
                    id: req.params.id
                }
            }).then((post) => {
				//Vérification que le demandeur est soit l'admin soit le poster 
                if (post.userId == req.auth.userId || user.admin == true) {
                    // Si nouvelle image celle ci est enregistrée
                    if (req.file) {
                        newImageUrl = `${req.protocol}://${req.get("host")}/images/posts/${
      					req.file.filename}`;
                    }

                    // Si nouvelle image, et image précédente existante, cette dernière est supprimée
                    if (newImageUrl && post.imageURL) {
                        const filename = post.imageURL.split("/images/posts/")[1];
                        fs.unlink(`images/posts/${filename}`, (error) => {
                            if (error) console.log(error);
                            else {
                                console.log(`Deleted file: images/posts/${filename}`);
                            }
                        });
                    }
                    // modification du post avec la methode update
                    Post.update({
                            message: req.body.message,
                            imageURL: newImageUrl, // Si nouvelle image, son chemin est enregistré dans la BDD
                        }, {
                            where: {
                                id: req.params.id
                            },
                        })
                        .then(() => res.status(200).json({
                            message: "Post mis à jour !"
                        }))
                        .catch((error) => res.status(400).json({
                            error
                        }))

                        .catch((error) => res.status(500).json({
                            error
                        }));
                } else {
                    res.status(401).json({
                        message: "Impossible de modifier une publication que vous n'avez pas créér !"
                    });
                }
            }).catch(err => res.status(500).json(err))
        })
        .catch(error => res.status(500).json(error));
};