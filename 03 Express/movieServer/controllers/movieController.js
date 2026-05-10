const express = require('express');
const movieController = express.Router();
const movieService = require('../services/movieService');

movieController.get('/movies/create', (request, response) => {
    response.render('create');
});

movieController.post('/movies/create', (request, response) => {
    const newMovie = request.body;

    movieService.create(newMovie);

    response.redirect('/');
});

movieController.get('/movies/:movieId', (request, response) => {
    const givenId = request.params.movieId;
    const movie = movieService.readSpecificMovie(givenId);
    response.render('details', movie);
});

module.exports = movieController;
