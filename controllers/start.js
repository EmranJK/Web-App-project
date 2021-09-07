'use strict';

// import all required modules
const logger = require('../utils/logger');
const movielistStore = require('../models/movielist-store.js');
const accounts = require ('./accounts.js');

// create start object
const start = {

  // index method - responsible for creating and rendering the view
   index(request, response) {

    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');

    if(loggedInUser){

      const movielists = movielistStore.getAllMovielists();
      let numMovielists = movielists.length;
      let numMovies = 0;
      for (let i in movielists) {
        numMovies = numMovies + movielists[i].movies.length;
      }

      const viewData = {
        title: 'Welcome to the Movielist App!',
        totalMovielists: numMovielists,
        totalMovies: numMovies,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture,
      };

      response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

// export the start module
module.exports = start;