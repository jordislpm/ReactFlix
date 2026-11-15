import ReactFlixCarrousel from "../../components/Carrousel/Carrousel";
import { useEffect, useState } from "react";
import "./homePage.css";
import useGetSingleMovie from "../../hooks/useGetSingleMovie";
import Buttons from "../../components/Buttons/Buttons";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [moviePoster, , loadingPoster] = useGetSingleMovie(1011679);
  const [moviePosterName, setMoviePosterName] = useState([]);
  const [homeMobile, setHomeMobile] = useState(false);

  useEffect(() => {
    const handleResizeHome = () => {
      if (window.innerWidth < 1120) {
        setHomeMobile(true);
      } else {
        setHomeMobile(false);
      }
    };
    window.addEventListener("resize", handleResizeHome);
    handleResizeHome();

    return () => {
      window.removeEventListener("resize", handleResizeHome);
    };
  }, []);

  useEffect(() => {
    if (moviePoster && moviePoster.title) {
      setMoviePosterName(moviePoster.title.split(" "));
    }
  }, [moviePoster]);

  if (loadingPoster && !moviePoster) {
    return <Loader fullPage message="Cargando películas..." />;
  }

  return (
    <>
      <div className="body"></div>
      {!homeMobile && (
        <>
          {moviePoster && (
            <div className="homePoster">
              <img
                alt={moviePoster.title}
                src={moviePoster.images?.backdrops?.[0]?.path || moviePoster.main_poster || ""}
              />
              <div className="homePoster_section">
                <div className="homePoster_info">
                  <div className="homePosterTittle">
                    <h3>{moviePoster.title ? moviePoster.title.split(" ")[0] : ""}</h3>
                    {moviePosterName.length > 1 && (
                      <h4>
                        {moviePoster.title.slice(moviePoster.title.split(" ")[0].length)}
                      </h4>
                    )}
                  </div>
                  <p>{moviePoster.overview}</p>
                  <div>
                    {moviePoster.stars && moviePoster.stars.length > 0 ? (
                      moviePoster.stars.map((star) => {
                        return <span key={star.credit_id || star.id}>| {star.name} | </span>;
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                  <Buttons movie={moviePoster} />
                </div>
                {!homeMobile && (
                  <div className="homePoster_carrousel">
                    <ReactFlixCarrousel title="Popular" page={1} autoChange={false} />
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {homeMobile && (
        <>
          {moviePoster && (
            <div className="homePosterMobile">
              <img
                alt={moviePoster.title}
                src={moviePoster.images?.backdrops?.[0]?.path || moviePoster.main_poster || ""}
              />
              <div className="PosterMobile_section">
                <h3>{moviePoster.title ? moviePoster.title.split(" ")[0] : ""}</h3>
                {moviePosterName.length > 1 && (
                  <h4>
                    {moviePoster.title.slice(moviePoster.title.split(" ")[0].length)}
                  </h4>
                )}
                <Buttons movie={moviePoster} />
              </div>
            </div>
          )}
        </>
      )}

      {homeMobile && <ReactFlixCarrousel title="Popular" page={1} autoChange={false} />}
      <ReactFlixCarrousel title="Upcoming!" page={2} category={"upcoming"} />
      <ReactFlixCarrousel title="Now Playing!" page={2} category={"now_playing"} />
      <ReactFlixCarrousel title="Top Rated!" page={2} category={"top_rated"} />
    </>
  );
};

export default HomePage;
