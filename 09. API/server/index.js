const express = require('express');
const { userMiddleware } = require('./middlewares/userMiddleware');
const mongoose = require('mongoose');

const server = express();
const routes = require('./routes');

//CORS
server.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-authorization");
    next();
});

server.use(express.json());
server.use(userMiddleware);

server.get('/', (request, response) => {
    response.json({ ok: true });
});

// server.get('/data/catalog', (request, response) => {
//     response.json([]);
// });

server.use(routes);

mongoose.connect('mongodb://localhost:27017/furniture-api')
    .then(() => console.log('Database connected'));

server.listen(5000, () => console.log('Server is listening on port 5000...'));
