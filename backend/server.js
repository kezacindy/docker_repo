// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// MongoDB URI from Atlas
const mongoURI = 'mongodb+srv://kezacindy830:2002keza@cluster0.gm5zn.mongodb.net/';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define Movie schema
const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  watched: { type: Boolean, default: false },
  releaseYear: Number,
});

const Movie = mongoose.model('Movie', movieSchema);

// Routes
app.get('/api/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// Search movies by title or genre
app.get('/api/movies/search', async (req, res) => {
  const { query } = req.query;
  const movies = await Movie.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { genre: { $regex: query, $options: 'i' } },
    ],
  });
  res.json(movies);
});

app.post('/api/movies', async (req, res) => {
  const { title, genre, releaseYear } = req.body;
  const newMovie = new Movie({ title, genre, releaseYear });
  await newMovie.save();
  res.json(newMovie);
});

// Update movie details (title, genre, release year)
app.put('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  const { title, genre, releaseYear } = req.body;
  const updatedMovie = await Movie.findByIdAndUpdate(id, { title, genre, releaseYear }, { new: true });
  res.json(updatedMovie);
});

// Toggle watched status
app.put('/api/movies/:id/watched', async (req, res) => {
  const { id } = req.params;
  const { watched } = req.body;
  const updatedMovie = await Movie.findByIdAndUpdate(id, { watched }, { new: true });
  res.json(updatedMovie);
});

// Delete movie
app.delete('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  await Movie.findByIdAndDelete(id);
  res.send('Movie deleted');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
