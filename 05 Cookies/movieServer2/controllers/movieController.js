const express = require('express');
const movieController = express.Router();
const movieService = require('../services/movieService');
const castService = require('../services/castService');
const { isAuthenticate } = require('../middlewares/userMiddleware');

const Cast = require('../models/Cast');

movieController.get('/movies/create', isAuthenticate, (request, response) => {
    response.render('create');
});

movieController.post('/movies/create', isAuthenticate, async (request, response) => {
    const newMovie = request.body;

    newMovie.owner = request.user._id;

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
    const isOwner = movie.owner && movie.owner == request.user?._id; //optional chaining

    response.render('details', { movie, isOwner });
});

movieController.get('/movies/:movieId/attach', isAuthenticate, async (request, response) => {
    const givenId = request.params.movieId;
    const movie = await movieService.readSpecificMovieFromDatabase(givenId).lean();
    const castAll = await castService.readCastFromDatabase().lean();

    response.render('cast-attach', { movie, castAll });
});

movieController.post('/movies/:movieId/attach', isAuthenticate, async (request, response) => {
    const currentMovieId = request.params.movieId;
    const castId = request.body.cast;
    const movie = await movieService.readSpecificMovieFromDatabase(currentMovieId);
    movie.cast.push(castId);
    await movie.save();
    response.redirect(`/movies/${currentMovieId}`);
});

movieController.get('/movies/:movieId/edit', isAuthenticate, async (request, response) => {
    if (!request.user) {
        return response.redirect('/login');
    }

    const givenId = request.params.movieId;

    const movie = await movieService.readSpecificMovieFromDatabaseAndPopulate(givenId).lean();

    response.render('edit', { movie });
});

movieController.post('/movies/:movieId/edit', isAuthenticate, async (request, response) => {
    const editedMovie = request.body;

    await movieService.edit(request.params.movieId, editedMovie);
    
    response.redirect(`/movies/${request.params.movieId}`);
});

movieController.get('/movies/:movieId/delete', isAuthenticate, async (request, response) => {
    await movieService.delete(request.params.movieId);

    response.redirect('/');
});

module.exports = movieController;
