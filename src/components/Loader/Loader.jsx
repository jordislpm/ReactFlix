import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import logo from "../../Assets/img/reactflixLogo.png";
import "./Loader.css";

const Loader = ({ message = "Cargando películas...", fullPage = false }) => {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSlow(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader_container ${fullPage ? "loader_fullpage" : ""}`}>
      <img src={logo} alt="ReactFlix Logo" className="loader_logo" />
      <Spinner animation="border" role="status" className="loader_spinner" />
      <p className="loader_message">{message}</p>
      {isSlow && (
        <span className="loader_submessage">
          El servidor en la nube se está iniciando. Esto puede tomar unos segundos...
        </span>
      )}
    </div>
  );
};

export default Loader;
