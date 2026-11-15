import { useState, useEffect } from "react";
import axios from "axios";

/**
 * @param {string} category - Represents the category of the movie list that we are looking for, could be: top_rated, upcoming, latest, now_playing
 * @param {number} page - Represents the page that we want to get
 * @returns {Array} - Returns an array that contains the list of movies, setMovieList, amountOfPages, setAmountOfPages.
 */
function useGetMovieList(category, page) {
  const [movieList, setMovieList] = useState([]);
  const [amountOfPages, setAmountOfPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await axios.get(
          `${apiUrl}/movies/${category}/page/${page}`
        );
        if (isMounted) {
          setAmountOfPages(response.data.total_pages);
          setMovieList(response.data.results || []);
        }
      } catch (error) {
        console.error("Error fetching movie list in hook:", error.message);
        if (isMounted) {
          setMovieList([]);
        }
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
  }, [category, page]);

  return [movieList, setMovieList, amountOfPages, setAmountOfPages, loading];
}

export default useGetMovieList;
