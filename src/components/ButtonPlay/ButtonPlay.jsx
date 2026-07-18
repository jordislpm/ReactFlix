import React from 'react'
import './ButtonPlay.css'
import { GrPlayFill } from "react-icons/gr";

const ButtonPlay = ({ movie }) => {
  const toPlay = () => {
    // If the movie has a trailer/video, scroll smoothly to it
    const trailerElement = document.getElementById("trailer-section");
    if (trailerElement && movie?.videos && movie.videos.length > 0 && movie.videos[0]?.key) {
      trailerElement.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("We can't play the movie (no trailer available).");
    }
  };

  return (
    <button onClick={toPlay} className="button_play">
      <GrPlayFill className="icon" />
      <div className="play_text">Play</div>
    </button>
  );
};

export default ButtonPlay;
