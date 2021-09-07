'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const movielistStore = require('../models/movielist-store');
const uuid = require('uuid');
const movielist = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const movielistId = request.params.id;
    logger.debug('Movielist id = ' + movielistId);
    if (loggedInUser) {
    const viewData = {
      title: 'Movielist',
      movielist: movielistStore.getMovielist(movielistId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
    };
    response.render('movielist', viewData);
    }
    else response.redirect('/');
},
    deleteMovie(request, response) {
    const movielistId = request.params.id;
    const movieId = request.params.movieid;
    logger.debug(`Deleting Movie ${movieId} from Movielist ${movielistId}`);
    movielistStore.removeMovie(movielistId, movieId);
    response.redirect('/movielist/' + movielistId);
  },
   addMovie(request, response) {
    const movielistId = request.params.id;
    const movielist = movielistStore.getMovielist(movielistId);
    const uuid = require('uuid');
    const newMovie = {
      id:uuid(),
      title: request.body.title,
      artist: request.body.artist,
    };
    movielistStore.addMovie(movielistId, newMovie);
    response.redirect('/movielist/' + movielistId);
  },
  updateMovie(request, response) {
    const movielistId = request.params.id;
    const movieId = request.params.movieid;
    logger.debug("updating movie " + movieId);
    const updatedMovie = {
      title: request.body.title,
      artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration
    };
    movielistStore.editMovie(movielistId, movieId, updatedMovie);
    response.redirect('/movielist/' + movielistId);
  }
};

module.exports = movielist;