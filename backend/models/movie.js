// backend/models/movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  releaseYear: Number,
  watched: { type: Boolean, default: false },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
