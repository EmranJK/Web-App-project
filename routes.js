'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const movieMenu = require('./controllers/movieMenu.js');
const about = require('./controllers/about.js');
const movielist = require('./controllers/movielist.js');
const accounts = require ('./controllers/accounts.js');

// connect routes to controllers

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);
router.get('/movieMenu', movieMenu.index);
router.get('/about', about.index);
router.get('/movielist/:id', movielist.index);

router.get('/movielist/:id/deleteMovie/:movieid', movielist.deleteMovie);
router.post('/movielist/:id/addmovie', movielist.addMovie);

router.get('/movieMenu/deletemovielist/:id', movieMenu.deleteMovielist);
router.post('/movieMenu/addmovielist', movieMenu.addMovielist);

router.post('/movielist/:id/updatemovie/:movieid', movielist.updateMovie);

// export router module
module.exports = router;