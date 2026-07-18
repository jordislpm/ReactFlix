import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();
const api_key = process.env.TMDB_API_KEY;

/**
 * @param {string} category - Represents the category of the movie list that we are looking for: top_rated, upcoming, latest, now_playing
 * @param {number} page - Represents the page that we want to get
 * @returns {Object} - Returns an object that contains results (list of movies) and total_pages.
 */
async function getMovieList(category, page) {
  try {
    const movieListRaw = await axios.get(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${api_key}&language=en-US&page=${page}`
    );
    const movieList = movieListRaw.data.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.original_title,
        overview: movie.overview,
        main_poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
        votes: {
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
        },
      };
    });

    return { results: movieList, total_pages: movieListRaw.data.total_pages };
  } catch (error) {
    console.error(`Error in getMovieList for category ${category}:`, error.message);
    return { results: [], total_pages: 0 };
  }
}

export default getMovieList;
