const express = require('express');
const handlebars = require('express-handlebars');

const homeController = require('./controllers/homeController');
const catalogController = require('./controllers/catalogController');
const createController = require('./controllers/createController');

const server = express();
const template = handlebars.create({
    extname: '.hbs'
});

server.engine('.hbs', template.engine);
server.set('view engine', '.hbs');

server.use(express.urlencoded({extended: false}));
server.use('/static', express.static('static'));

server.use('/', homeController);
server.use('/catalog', catalogController);
server.use('/create', createController);

server.listen(3000);
