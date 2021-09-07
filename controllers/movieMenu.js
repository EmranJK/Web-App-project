'use strict';

// import all required modules
const accounts = require ('./accounts.js');
const uuid = require('uuid');
const logger = require('../utils/logger');
const movielistStore = require('../models/movielist-store.js');

// create movieMenu object
const movieMenu = {
  
  // index method - responsible for creating and rendering the view
    index(request, response) {
    logger.info('movieMenu rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'Movielist MovieMenu',
      movielists: movielistStore.getUserMovielists(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
    };
    logger.info('about to render' + viewData.movielists);
    response.render('movieMenu', viewData);
    }
    else response.redirect('/');
  },
  
  deleteMovielist(request, response) {
    const movielistId = request.params.id;
    logger.debug(`Deleting Movielist ${movielistId}`);
    movielistStore.removeMovielist(movielistId);
    response.redirect('/movieMenu');
  },
      addMovielist(request, response) {
        
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newMovieList = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      duration: request.body.duration,
      picture: request.files.picture,
      date: date,
      movies: [],
    };
    logger.debug('Creating a new Movielist' + newMovieList);
    movielistStore.addMovielist(newMovieList, function(){
    response.redirect('/movieMenu');
    });
  },
  
};

// export the movieMenu module
module.exports = movieMenu;