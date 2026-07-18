import React, { useState, useEffect } from "react";
import "./buttonFavorite.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ButtonFavorite = ({ movie, text = false }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!movie) return;
    const favorites = JSON.parse(localStorage.getItem("reactflix_favorites") || "[]");
    setIsFavorite(favorites.some((fav) => fav.id === movie.id));
  }, [movie]);

  const toggleFavorite = () => {
    if (!movie) return;
    let favorites = JSON.parse(localStorage.getItem("reactflix_favorites") || "[]");
    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.id !== movie.id);
      setIsFavorite(false);
    } else {
      favorites.push({
        id: movie.id,
        title: movie.title,
        main_poster: movie.main_poster || (movie.images?.backdrops?.[0]?.path || "")
      });
      setIsFavorite(true);
    }
    localStorage.setItem("reactflix_favorites", JSON.stringify(favorites));
  };

  return (
    <button onClick={toggleFavorite} className="button_favorite" style={{ display: "flex", alignItems: "center" }}>
      {isFavorite ? (
        <AiFillStar className="navText" style={{ color: "#ffc107" }} />
      ) : (
        <AiOutlineStar className="navText" />
      )}
      {text && (
        <div className="navText" style={{ marginLeft: "5px" }}>
          {isFavorite ? "Remove Favorite" : "Add to Favorite"}
        </div>
      )}
    </button>
  );
};

export default ButtonFavorite;
