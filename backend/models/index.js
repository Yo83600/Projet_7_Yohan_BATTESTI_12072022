const User = require('./user.js')
const Post = require('./post.js')
const Like = require('./like.js')

const db = {
    User,
    Post,
    Like
}

module.exports = db;