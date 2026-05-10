const express = require('express');
const hbs = require('express-handlebars').create({
    extname: '.hbs'
});
const mongoose = require('mongoose');
const connectionString = 'mongodb://0.0.0.0:27017/Book';

const homeController = require('./controller/homeController');
const articleController = require('./controller/articleController');

async function start() {
    const server = express();
    server.engine('.hbs', hbs.engine);
    server.set('view engine', '.hbs');

    server.use(express.urlencoded({extended: true}));
    server.use(homeController);
    server.use('/articles', articleController)

    await mongoose.connect(connectionString);
    console.log('Database connected');


    server.listen(3000);
}

start();
