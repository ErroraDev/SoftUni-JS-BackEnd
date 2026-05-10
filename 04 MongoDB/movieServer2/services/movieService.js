const { response } = require("express");

const moviesArray = [
    {
        _id: 1,
        title: "Car2 ",
        genre: "Normal walking",
        director: "Pesho",
        date: "2025",
        imageUrl: "One car arround the horizon",
        rating: 4,
        description: "Driving",
    },
    {
        _id: 2,
        title: "Jungle Cuise",
        genre: "Adventure",
        director: "Pesho",
        date: "2024",
        imageUrl: "/static/img/jungle-cruise.jpeg",
        rating: 5,
        description: "Dreaming about saving countless lives and having another adventure, the feisty Englishfeminist and doctor of botany, Dr Lily Houghton, embarks on a peril-laden mission to change theworld. Along with her fashionable brother, MacGregor, Dr Houghton enlists the help of the arrogant,wisecracking riverboat skipper, Captain Frank Wolff, to guide them through the serpentine AmazonRiver in La Quila, his swift wooden boat. Now, as the intrepid trio ventures deeper and deeper intothe heart of an impenetrable green maze, searching for something that cannot be found, acenturies-old curse and the ruthless aristocrat, Prince Joachim, threaten to put an end to theirambitious plans.",
    }
];

exports.create = (movieAllFields) => {
    movieAllFields._id = moviesArray[moviesArray.length - 1]._id + 1;

    moviesArray.push(movieAllFields)
};

exports.search = (title, genre, year) => {
    let moviesCopy = Array.from(moviesArray);

    if(title){
        moviesCopy = moviesCopy.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
    }

    if(genre){
        moviesCopy = moviesCopy.filter(movie => movie.genre == genre);
    }

    if(year){
        moviesCopy = moviesCopy.filter(movie => movie.year == year);
    }

    return moviesCopy;
};

function readMovies() {
    //for shallow copy so the original array to stay private
    return Array.from(moviesArray);
}

function readSpecificMovie(givenId) {
    return moviesArray.find(movie => movie._id == givenId);
}

exports.readMovies = readMovies;
exports.readSpecificMovie = readSpecificMovie;

const Movie = require('../models/Movie');

async function readMoviesFromDatabase(){
    const movies = await Movie.find({}).lean();
    return movies;
}

async function createAndUploadToDatabase(movieAllFields){
    await Movie.create({
        title: movieAllFields.title,
        genre: movieAllFields.genre,
        director: movieAllFields.director,
        year: Number(movieAllFields.year),
        rating: Number(movieAllFields.rating),
        description: movieAllFields.description,
        imageUrl: movieAllFields.imageUrl,
        cast: movieAllFields.cast
    });
}

function readSpecificMovieFromDatabase(givenId){
    const movie = Movie.findOne({_id: givenId});
    return movie;
}

async function searchFromDatabase(title, genre, year){
    let query = {};

    if(title){
        query.title = new RegExp(title, 'i');
    }

    if(genre){
        query.genre = new RegExp(genre, 'i');
    }

    if(year){
        query.year = year;
    }

    return Movie.find(query).lean();
};

exports.readSpecificMovieFromDatabaseAndPopulate = (movieId) => {
    return Movie.findById(movieId).populate('cast');
};

exports.readMoviesFromDatabase = readMoviesFromDatabase;
exports.readSpecificMovieFromDatabase = readSpecificMovieFromDatabase;
exports.createAndUploadToDatabase = createAndUploadToDatabase;
exports.searchFromDatabase = searchFromDatabase;
