const mongoose = require('mongoose');

const stoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        required: true
    },
    category: {
        type: String,
        minlength: 3,
        required: true
    },
    color: {
        type: String,
        minlength: 2,
        required: true
    },
    image: {
        type: String,
        match: /^https?:\/\/.*$/,
        required: true
    },
    location: {
        type: String,
        minlength: 5,
        maxlength: 15,
        required: true
    },
    formula: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true
    },
    description: {
        type: String,
        minlength: 10,
        required: true
    },
    likedList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, 
{ timestamps: true });

const Stone = mongoose.model('Stone', stoneSchema);

module.exports = Stone;
