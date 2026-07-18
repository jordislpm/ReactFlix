import express from "express";
import {
  getMovieDetails,
  getMovieDirector,
  getMovieImages,
  getMovieMainActors,
  getMovieVideos,
  getMovieWriter,
  getSimilarMovies,
} from "./singleMovieDataCollector.mjs";
import getMovieList from "./movieListDataCollector.mjs";
import searchMovie from "./searchMovieCollector.mjs";
import cors from "cors";

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.get("/movie/:query/page/:page", (req, res) => {
  const query = req.params.query;
  const page = req.params.page;
  searchMovie(query, page)
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.error(`Error searching movie "${query}" page ${page}:`, error.message);
      res.status(500).json({ error: "Failed to search movies" });
    });
});

app.get("/movies/:category/page/:pageId", (req, res) => {
  const category = req.params.category;
  const page = req.params.pageId;
  getMovieList(category, page)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(`Error loading movie list for "${category}" page ${page}:`, error.message);
      res.status(500).json({ error: "Failed to load movie list" });
    });
});

app.get("/movie/:id", (req, res) => {
  const id = req.params.id;
  Promise.all([
    getMovieDetails(id),
    getMovieDirector(id),
    getMovieVideos(id),
    getMovieWriter(id),
    getMovieMainActors(id),
    getMovieImages(id),
    getSimilarMovies(id),
  ])
    .then(([movieDetails, director, videos, writer, stars, images, similar]) => {
      res.json({
        id: movieDetails.id,
        title: movieDetails.original_title,
        overview: movieDetails.overview,
        main_poster: movieDetails.poster_path
          ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
          : null,
        images,
        director,
        videos,
        writer,
        stars,
        similar,
      });
    })
    .catch((error) => {
      console.error(`Error getting movie details for id ${id}:`, error.message);
      res.status(500).json({ error: "Failed to load movie details" });
    });
});

app.listen(port, () => {
  console.log(`Backend Running on port:${port}`);
});
