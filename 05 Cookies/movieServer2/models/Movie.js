const { Schema, model, Types, default: mongoose } = require('mongoose');

const movieSchema = new Schema({
    id: Number,
    title: { type: String, required: true },
    genre: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true, min: [1900, `Must be at least 1990`], max: [2024, `The year must be up to 2024`]},
    rating: { type: Number, required: true, min: [0, `Must be at least 0`], max: [5, `The rating must be up to 5`]},
    description: { type: String, required: true, maxLength: 300 },
    imageUrl: {
        type: String,
        required: true,
        //match: /^https?:\/\/.*\.(gif|png|jpg|jpeg)$/i,
    },
    cast: { type: [Types.ObjectId], default: [], ref: 'Cast'},
    owner:{ type: Types.ObjectId, ref: 'User'}
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;
