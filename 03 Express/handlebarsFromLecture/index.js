const express = require('express');
const handlebars = require('express-handlebars');

const server = express();
const template = handlebars.create({
    extname: '.hbs'
});

server.engine('.hbs', template.engine);
server.set('view engine', '.hbs');

server.get('/', (request, response) => {
    response.render('home', {
        username: 'Peter',
        title: 'title hello',
        message: 'message Hello',
        response: 'General Kenoby',
        product:{
            name: 'Product 1',
            price: 19.50
        },
        contacts: [
            {
                name: 'Peter',
                email: 'peter@hotmail.com'
            },
            {
                name: 'Elena',
                email: 'elena@hotmail.com'
            },
            {
                name: 'Lazar',
                email: 'lazar@hotmail.com'
            }
        ]
    });
});

// server.get('/', (request, response) => {
//     response.locals.message = 'locals message Hello';
//     response.locals.response = 'locals response General Kenoby';
//     response.render('home');
// });

server.listen(3000);
