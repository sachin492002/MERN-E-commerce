const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    id :{
        type: String,
        required: true,

    },
    mail:{
        type: String,
        required: true,
    },
    msg:{
        type: String,
        required: true,
    }
})

const FeedModal = mongoose.model('Feed', feedSchema);

module.exports = FeedModal