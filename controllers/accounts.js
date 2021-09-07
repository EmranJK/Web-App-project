'use strict';

const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('movielist', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid();
    user.picture = request.files.picture,
    userstore.addUser(user, function(){
    logger.info('registering' + user.email);
    response.redirect('/');
    });
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
 /**/   //const password = userstore.getUserByPassword(request.body.password);
/**/    if (user && request.body.password === user.password){  //&& password) {
      response.cookie('movielist', user.email);
      logger.info('logging in' + user.email);
  /**/ //response.cookie('movielist', password.password);
    /**/  //logger.info('logging in' + password.password);
      response.redirect('/start');
    } else {
      response.redirect('/login');
    }
  },
  
/**/  /* authenticate(request, response) {
    const user = userstore.getUserByPassword(request.body.password);
    if (user) {
      response.cookie('movielist', user.password);
      logger.info('logging in' + user.password);
      response.redirect('/start');
    } else {
      response.redirect('/login');
    }
  }, */
  

  getCurrentUser (request) {
    const userEmail = request.cookies.movielist;
 /**/  // const userPassword = request.cookies.movielist;
    return userstore.getUserByEmail(userEmail);
 
   /**/ // return userstore.getUserByPassword(userPassword);
  }
  
}

module.exports = accounts;