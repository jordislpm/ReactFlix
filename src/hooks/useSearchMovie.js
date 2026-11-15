import { useState, useEffect } from "react";
import axios from "axios";

function useSearchMovie(query, page) {
  const [movieList, setMovieList] = useState([]);
  const [maxAmountOfPages, setMaxAmountOfPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      if (!query) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await axios.get(
          `${apiUrl}/movie/${query}/page/${page}`
        );
        if (isMounted) {
          setMaxAmountOfPages(response.data.total_pages);
          setMovieList(response.data.results || []);
        }
      } catch (error) {
        console.error(`Error searching movies for "${query}" (page ${page}):`, error.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [query, page]);

  return [movieList, maxAmountOfPages, loading];
}

export default useSearchMovie;
