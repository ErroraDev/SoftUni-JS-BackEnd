const homeController = require('express').Router();

homeController.get('/', (request, response) => {
    response.render('home');
});

module.exports = homeController;
