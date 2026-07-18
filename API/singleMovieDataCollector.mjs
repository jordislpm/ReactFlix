import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();
const api_key = process.env.TMDB_API_KEY;

async function getMovieImages(movieId) {
  try {
    const movieDetails = await getMovieDetails(movieId);
    let imagesData = {};
    if (movieDetails && movieDetails.backdrop_path) {
      imagesData = { poster: movieDetails.backdrop_path };
    }
    //Detect movie images with get images API
    const getImages = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${api_key}`
    );
    imagesData = { ...imagesData, images: getImages.data };

    //Detect if the movies has collections
    if (movieDetails && movieDetails.belongs_to_collection) {
      const collectionId = movieDetails.belongs_to_collection.id;
      const collectionRaw = await axios.get(
        `https://api.themoviedb.org/3/collection/${collectionId}/images?api_key=${api_key}`
      );
      const collections = collectionRaw.data;
      imagesData = { ...imagesData, images: collections };
    }
    //Now we will filter the data
    const backdrops = imagesData.images?.backdrops || [];
    const posters = imagesData.images?.posters || [];
    const logos = imagesData.images?.logos || [];

    const filteredBackdrops = backdrops.map((backdrop) => {
      return {
        height: backdrop.height,
        path: `https://image.tmdb.org/t/p/w500${backdrop.file_path}`,
        aspectRatio: backdrop.aspect_ratio,
      };
    });
    const filteredPosters = posters.map((poster) => {
      return {
        height: poster.height,
        path: `https://image.tmdb.org/t/p/w500${poster.file_path}`,
        aspectRatio: poster.aspect_ratio,
      };
    });
    const filteredLogos = logos.map((logo) => {
      return {
        height: logo.height,
        path: `https://image.tmdb.org/t/p/w500${logo.file_path}`,
        aspectRatio: logo.aspect_ratio,
      };
    });

    return {
      backdrops: filteredBackdrops,
      posters: filteredPosters,
      logos: filteredLogos,
    };
  } catch (error) {
    console.error("Error in getMovieImages:", error.message);
    return {
      backdrops: [],
      posters: [],
      logos: [],
    };
  }
}

async function getMovieWriter(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}&language=en-US`
    );
    const crew = response.data.crew || [];

    return crew.find(
      (member) => member.job === "Writer" && member.department === "Writing"
    ) || null;
  } catch (error) {
    console.error("Error in getMovieWriter:", error.message);
    return null;
  }
}

async function getMovieDirector(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}&language=en-US`
    );
    const crew = response.data.crew || [];

    return crew.find(
      (member) => member.job === "Director" && member.department === "Directing"
    ) || null;
  } catch (error) {
    console.error("Error in getMovieDirector:", error.message);
    return null;
  }
}

async function getMovieVideos(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}&language=en-US`
    );
    return response.data.results || [];
  } catch (error) {
    console.error("Error in getMovieVideos:", error.message);
    return [];
  }
}

async function getMovieMainActors(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}&language=en-US`
    );
    const cast = response.data.cast || [];

    return cast.slice(0, 3);
  } catch (error) {
    console.error("Error in getMovieMainActors:", error.message);
    return [];
  }
}

async function getSimilarMovies(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${api_key}&language=en-US`
    );
    return response.data.results || [];
  } catch (error) {
    console.error("Error in getSimilarMovies:", error.message);
    return [];
  }
}

async function getMovieDetails(id) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
    );
    return response.data;
  } catch (error) {
    console.error("Error in getMovieDetails:", error.message);
    throw error;
  }
}

export {
  getMovieDetails,
  getMovieDirector,
  getMovieVideos,
  getMovieMainActors,
  getMovieWriter,
  getMovieImages,
  getSimilarMovies,
};
