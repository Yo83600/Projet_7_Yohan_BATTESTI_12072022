const User = require('./user.js')
const Post = require('./post.js')
const Like = require('./like.js')

const db = {
    User,
    Post,
    Like
}

// Mise en place des associations entre tables ---------------------------------------------------------------
User.hasMany(Post, {
  onDelete: "CASCADE", // Nécessaire de renseigner onDelete également dans les associations hasMany !
});

User.hasMany(Like, {
  onDelete: "CASCADE",
});

Post.hasMany(Like, {
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

Like.belongsTo(Post, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

Like.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

module.exports = db;