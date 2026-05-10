const express = require('express');
const homeController = express.Router();
const movieService = require('../services/movieService');

homeController.get('/', (request, response) => {
    const movies = movieService.readMovies();

    response.render('home', { movies });
});

homeController.get('/about', (request, response) => {
    response.render('about');
});

homeController.get('/search', (request, response) => {
    const { title, genre, year } = request.query;

    const movies = movieService.search(title, genre, year);
    response.render('search', { movies });
});

module.exports = homeController;
