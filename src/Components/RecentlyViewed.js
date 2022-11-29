import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContextData } from "../Provider/Provider";
import "./RecentlyViewed.css";
import playIcon from "./assets/play-button-icon.gif";
import watchHistoryIcon from "./assets/watch-history-icon.png";
import lightWatchHistory from "./assets/light-recent-icon.png";

function RecentlyViewed(props) {
  const { recent, setRecent, darkMode } = useContext(ContextData);

  useEffect(() => {
    const stored = JSON.parse(window.localStorage.getItem(`recents`));
    setRecent(stored);
  }, []);

  return (
    <aside className="recent-views">
      <h4>
        <img
          src={!darkMode ? watchHistoryIcon : lightWatchHistory}
          alt="watch-history-icon"
        />
        <span>Your 5 Most Recent Views</span>
      </h4>
      <ul>
        {recent &&
          recent.map(({ id, title }, index) => {
            if (index < 5) {
              return (
                <Link to={`/video/${id}`} key={id}>
                  <li>
                    <img src={playIcon} alt="play-button" />
                    <span>{title}</span>
                  </li>
                </Link>
              );
            }
          })}
      </ul>
    </aside>
  );
}

export default RecentlyViewed;
