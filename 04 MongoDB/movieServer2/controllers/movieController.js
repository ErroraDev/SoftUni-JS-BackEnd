const express = require('express');
const movieController = express.Router();
const movieService = require('../services/movieService');
const castService = require('../services/castService');
const Cast = require('../models/Cast');

movieController.get('/movies/create', (request, response) => {
    response.render('create');
});

movieController.post('/movies/create', async (request, response) => {
    const newMovie = request.body;

    await movieService.createAndUploadToDatabase(newMovie);

    response.redirect('/');
});

//with two Queries 
// movieController.get('/movies/:movieId', async (request, response) => {
//     const givenId = request.params.movieId;
//     //const movie = movieService.readSpecificMovie(givenId);
//     const movie = await movieService.readSpecificMovieFromDatabase(givenId).lean();
//     const castAll = await castService.readCastFromArray(movie.cast).lean();

//     response.render('details', { movie, castAll });
// });

//with Populate
movieController.get('/movies/:movieId', async (request, response) => {
    const givenId = request.params.movieId;
    //const movie = movieService.readSpecificMovie(givenId);
    const movie = await movieService.readSpecificMovieFromDatabaseAndPopulate(givenId).lean();

    response.render('details', { movie });
});

movieController.get('/movies/:movieId/attach', async (request, response) => {
    const givenId = request.params.movieId;
    const movie = await movieService.readSpecificMovieFromDatabase(givenId).lean();
    const castAll = await castService.readCastFromDatabase().lean();

    response.render('cast-attach', { movie, castAll });
});

movieController.post('/movies/:movieId/attach', async (request, response) => {
    const currentMovieId = request.params.movieId;
    const castId = request.body.cast;
    const movie = await movieService.readSpecificMovieFromDatabase(currentMovieId);
    movie.cast.push(castId);
    await movie.save();
    response.redirect(`/movies/${currentMovieId}`);
});

module.exports = movieController;
