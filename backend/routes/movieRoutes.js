// backend/routes/movieRoutes.js
const express = require('express');
const Movie = require('../models/movie');
const router = express.Router();

// Get all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new movie
router.post('/movies', async (req, res) => {
  const { title, genre, releaseYear } = req.body;
  const newMovie = new Movie({ title, genre, releaseYear });

  try {
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update movie watched status
router.put('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const { watched } = req.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, { watched }, { new: true });
    res.json(updatedMovie);
  } catch (error) {
    res.status(404).json({ message: "Movie not found" });
  }
});

// Delete a movie
router.delete('/movies/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Movie.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "Movie not found" });
  }
});

module.exports = router;
