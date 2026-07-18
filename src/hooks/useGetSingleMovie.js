import { useState, useEffect } from "react";
import axios from "axios";

function useGetSingleMovie(movieId) {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!movieId) return;
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await axios.get(
          `${apiUrl}/movie/${movieId}`
        );
        setMovieData(response.data);
      } catch (error) {
        console.error(`Error fetching single movie details (ID ${movieId}):`, error.message);
      }
    };
    fetchData();
  }, [movieId]);

  return [movieData, setMovieData];
}

export default useGetSingleMovie;
