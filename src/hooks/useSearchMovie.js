import { useState, useEffect } from "react";
import axios from "axios";

function useSearchMovie(query, page) {
  const [movieList, setMovieList] = useState([]);
  const [maxAmountOfPages, setMaxAmountOfPages] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (!query) return;
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await axios.get(
          `${apiUrl}/movie/${query}/page/${page}`
        );
        setMaxAmountOfPages(response.data.total_pages);
        setMovieList(response.data.results);
      } catch (error) {
        console.error(`Error searching movies for "${query}" (page ${page}):`, error.message);
      }
    }

    fetchData();
  }, [query, page]);

  return [movieList, maxAmountOfPages];
}

export default useSearchMovie;
