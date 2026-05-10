const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        required: true
    },
    type: {
        type: String,
        minlength: 3,
        required: true
    },
    certificate: {
        type: String,
        minlength: 2,
        required: true
    },
    image: {
        type: String,
        match: /^https?:\/\/.*\.(gif|png|jpg|jpeg)$/i,
        required: true
    },
    description: {
        type: String,
        minlength: 10,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    dateCreated: {
        type: Date
    },
    signUpList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
