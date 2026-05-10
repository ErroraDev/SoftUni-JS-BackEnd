const express = require('express');
const routes = require('./router');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');
const { userMiddleware } = require('./middlewares/userMiddleware');
const path = require('path');

const server = express();

server.use('/static', express.static(path.join(__dirname, 'static')));
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(userMiddleware);
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
server.use(routes);

mongoose.connect('mongodb://127.0.0.1:27017/earthTreasure');
mongoose.connection.on('connected', () => console.log('Database connected'));
mongoose.connection.on('disconnected', () => console.log('Database disconnected'));
mongoose.connection.on('error', (error) => console.log(error));

server.listen(3000);
