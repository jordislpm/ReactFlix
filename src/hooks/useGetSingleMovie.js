import { useState, useEffect } from "react";
import axios from "axios";

function useGetSingleMovie(movieId) {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (!movieId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await axios.get(
          `${apiUrl}/movie/${movieId}`
        );
        if (isMounted) {
          setMovieData(response.data);
        }
      } catch (error) {
        console.error(`Error fetching single movie details (ID ${movieId}):`, error.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [movieId]);

  return [movieData, setMovieData, loading];
}

export default useGetSingleMovie;
