const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = Schema({
    text: String,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'post'
    }
})

module.exports = mongoose.model('comment', commentSchema)