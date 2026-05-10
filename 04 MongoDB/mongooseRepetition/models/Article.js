const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
    author: String,
    title: {
        type: String,
        minLegth: 10
    },
    content: {
        type: String,
        minLegth: 10
    }
});

const Article = model('Article', articleSchema);

module.exports = Article;
