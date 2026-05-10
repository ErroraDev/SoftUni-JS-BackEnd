const express = require('express');
const routes = require('./routes');
const path = require('path');
const configHandlebars = require('./config/handlebarsConfig');

const mongoose = require('mongoose');
const connectionString = 'mongodb://0.0.0.0:27017/MovieCenter';
const cookieParser = require('cookie-parser');
const { userMiddleware } = require('./middlewares/userMiddleware');

async function start() {
    await mongoose.connect(connectionString);
    console.log('Database connected');

    const server = express();
    const port = 3000;

    configHandlebars(server);

    server.use('/static', express.static(path.join(__dirname, '/static')));
    server.use(express.urlencoded({ extended: false }));
    server.use(cookieParser());
    server.use(userMiddleware);
    server.use(routes);

    server.listen(port, () => console.log(`Server is on port ${port}`));

}

start();
