const { Schema, model } = require('mongoose');

const castSchema = new Schema({
    id: Number,
    name: { type: String, required: true },
    age: { type: Number, required: true, min: [14, `Must be at least 14`], max: [120, `The age is up to 120`]},
    born: { type: String, required: true },
    nameInMovie: { type: String, required: true},
    castImage: {
        type: String,
        required: true,
        match: /^https?:\/\/.*\.(gif|png|jpg|jpeg)$/i,
    }
});

const Cast = model('Cast', castSchema);

module.exports = Cast;
