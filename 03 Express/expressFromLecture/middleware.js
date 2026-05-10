const express = require('express');

const routerForMiddleware = express();

routerForMiddleware.post('/',
    (request, response, next) => {
        console.log('Middleware POST');
        next();
    },
    (request, response) => {
        response.redirect('/catalog');
    }
);

module.exports = {
    routerForMiddleware
};
