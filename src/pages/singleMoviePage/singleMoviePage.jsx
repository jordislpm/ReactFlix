import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetSingleMovie from "../../hooks/useGetSingleMovie";
import "./singleMoviePage.css";
import Buttons from "../../components/Buttons/Buttons";
import YoutubeVideo from "../../components/youtubeVideo/youtubeVideo";
import CarrouselSimilar from "../../components/CarrouselSimilar/CarrouselSimilar";
import Loader from "../../components/Loader/Loader";

const SingleMoviePage = () => {
  const { movieId } = useParams();
  const [movie, , loading] = useGetSingleMovie(movieId);
  const [mobile, setMobile] = useState(false);
  const [movieName, setMovieName] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 820) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (movie && movie.title) {
      setMovieName(movie.title.split(" "));
    }
  }, [movie]);

  if (loading && !movie) {
    return <Loader fullPage message="Cargando detalles de la película..." />;
  }

  return (
    <>
      {movie && (
        <>
          <div className="SinglePage_main">
            {!mobile && (
              <div className="SinglePage_main_left">
                <h3>{movie.title ? movie.title.split(" ")[0] : ""}</h3>
                {movieName.length > 1 && (
                  <h4>{movie.title.slice(movie.title.split(" ")[0].length)}</h4>
                )}
                <p>{movie.overview}</p>
                <div>
                  <Buttons movie={movie} />
                </div>
              </div>
            )}
            <div className="SinglePage_main_right">
              {movie.main_poster ? (
                <img className="SinglePage_main_img" src={movie.main_poster} alt={movie.title} />
              ) : movie.images?.backdrops?.[0]?.path ? (
                <img
                  className="SinglePage_main_img"
                  alt={movie.title}
                  src={movie.images.backdrops[0].path}
                />
              ) : null}
            </div>
            <div className="mobile_section"></div>
          </div>
          {mobile && (
            <div id="SinglePage_mobile">
              <Buttons movie={movie} />
              <p>{movie.overview}</p>
            </div>
          )}
          <div className="SinglePage_section">
            <div className="SinglePage_section_left">
              <div>Director</div>
              {movie.director ? (
                <div>{movie.director.name}</div>
              ) : (
                <div>unknown director</div>
              )}
              <div>Writer</div>
              {movie.writer ? (
                <div>{movie.writer.name}</div>
              ) : (
                <div>unknown Writer</div>
              )}
              <div>Stars</div>
              <div>
                {movie.stars && movie.stars.length > 0 ? (
                  movie.stars.map((star) => {
                    return <span key={star.credit_id || star.id}>| {star.name} | </span>;
                  })
                ) : (
                  <div>unknown Stars</div>
                )}
              </div>
            </div>
            <div id="trailer-section" className="SinglePage_section_right">
              {movie.videos && movie.videos.length > 0 && movie.videos[0]?.key ? (
                <>
                  <h3>TRAILER</h3>
                  <YoutubeVideo className="trailerVideo" videoKey={movie.videos[0].key} />
                </>
              ) : (
                <div style={{ color: "var(--netflix-white)", padding: "1rem" }}>No trailer available</div>
              )}
            </div>
          </div>
          {movie.similar && movie.similar.length > 0 && (
            <div>
              <CarrouselSimilar similar={movie.similar} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SingleMoviePage;
