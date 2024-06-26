'use strict';

// import all required modules
const logger = require('../utils/logger');
const developerStore = require('../models/developer-store.js');
const accounts = require ('./accounts.js');

// create about object
const about = {
  
  // index method - responsible for creating and rendering the view
 index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request); 
    logger.info('about rendering');
    if (loggedInUser) {
      const viewData = {
        title: 'About the Movielist App',
        developers: developerStore.getAllDevelopers(),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture,
      };
      response.render('about', viewData);
    }
    else response.redirect('/');    
  },
};

// export the about module
module.exports = about;