const mongoose = require('mongoose');
const connectionString = 'mongodb://0.0.0.0:27017/Book';

const Article = require('./models/Article');
const Comment = require('./models/Comment');

async function start() {
    await mongoose.connect(connectionString);
    console.log('connected');

    const articleWithPartOfParameters = await Article.findOne({}).populate('comments', 'content');
    console.log(articleWithPartOfParameters);
    
    await mongoose.disconnect();
    console.log('disconnected');
}

start()
