const express = require('express');
const homeController = express.Router();
const movieService = require('../services/movieService');

homeController.get('/', async (request, response) => {
    //const movies = movieService.readMovies();
    const movies = await movieService.readMoviesFromDatabase();

    response.render('home', { movies });
});

homeController.get('/about', (request, response) => {
    response.render('about');
});

homeController.get('/search', async (request, response) => {
    const { title, genre, year } = request.query;
    const moviesFromSearch = await movieService.searchFromDatabase(title, genre, year);
    response.render('search', { movies: moviesFromSearch, title, genre, year });
});

module.exports = homeController;
