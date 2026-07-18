import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import "../searchPage/searchPage.css";
import "./favorites.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("reactflix_favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="body" style={{ minHeight: "80vh", padding: "2rem" }}>
      <h3>My Favorites</h3>
      {favorites.length < 1 ? (
        <div className="movie_dont_find">
          <h2>No favorite movies added yet.</h2>
          <h2>Explore movies and click "Add to Favorite" to see them here!</h2>
        </div>
      ) : (
        <div className="cards_list">
          {favorites.map((movie) => (
            <Card
              key={movie.id}
              title={movie.title}
              url={movie.main_poster}
              id={movie.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;