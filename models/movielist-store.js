'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const cloudinary = require('cloudinary');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const movielistStore = {

  store: new JsonStore('./models/movielist-store.json', { movielistCollection: [] }),
  collection: 'movielistCollection',

  getAllMovielists() {
    return this.store.findAll(this.collection);
  },

  getMovielist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

    addMovielist(movielist, response) {
    movielist.picture.mv('tempimage', err => {
        if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            movielist.picture = result.url;
            response();
          });
        }
      });
    this.store.add(this.collection, movielist);
  },

  removeMovielist(id) {
    const movielist = this.getMovielist(id);
    this.store.remove(this.collection, movielist);
  },

  removeAllMovielists() {
    this.store.removeAll(this.collection);
  },

  addMovie(id, movie) {
    const movielist = this.getMovielist(id);
    movielist.movies.push(movie);
  },

  removeMovie(id, movieId) {
    const movielist = this.getMovielist(id);
    const movies = movielist.movies;
    _.remove(movies, { id: movieId});
  },
  
  getUserMovielists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
    editMovie(id, movieId, updatedMovie) {
    const movielist = this.getMovielist(id);
    const movies = movielist.movies;
    const index = movies.findIndex(movie => movie.id === movieId);
    movies[index].title = updatedMovie.title;
    movies[index].artist = updatedMovie.artist;
    movies[index].genre = updatedMovie.genre;
    movies[index].duration = updatedMovie.duration;
  }
  
};

module.exports = movielistStore;