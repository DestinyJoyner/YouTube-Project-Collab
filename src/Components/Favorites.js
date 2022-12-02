import { useContext, useEffect } from "react";
import { ContextData } from "../Provider/Provider";
import { Link } from "react-router-dom";
import "./Favorites.css";
import noImage from "./assets/no-image-dark.png";

function Favorites(props) {
  const { favData, setFavData } = useContext(ContextData);

  useEffect(() => {
    window.scrollTo(0, 0)
    const stored = JSON.parse(window.localStorage.getItem(`favorites`));
    stored ? setFavData(stored) : setFavData([]);
  }, []);
  return (
    <div className="favorites">
      <section>
        <img
          src={favData.length ? favData[0].image : noImage}
          alt="video-thumbnail"
        />
        <h3>⭐Favorite Videos⭐</h3>
        <p>
          {favData.length} {favData.length === 1 ? `video` : `videos`}
        </p>
      </section>

      <ol>
        {favData.map(({ vidId, title, image, chanName, chanId }) => (
          <li key={vidId}>
            <img src={image} alt="vid-thumbnail" />
            <div>
              <Link to={`/video/${vidId}`} key={vidId}>
                <h3>{title}</h3>
              </Link>
              <p>
                From: <span>{chanName}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Favorites;
