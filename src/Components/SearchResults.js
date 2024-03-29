import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContextProvider } from "../Provider/Provider";
import VideoThumbnail from "./VideoThumbnail";
import "./SearchResults.css";

export default function SearchResults({ defaultOrder, defaultNum }) {
  const { fetchData, searchResult, setSearchResult } = useContextProvider();

  const navigate = useNavigate();

  const { keyword } = useParams();
  const { order } = useParams();
  const { num } = useParams();

  const orderVal = defaultOrder ? "relevance" : order;

  const numVal = defaultNum ? 9 : num > 45 ? 45 : num;

  useEffect(() => {
    const stored = window.localStorage.getItem(
      `${keyword}-${orderVal}-${numVal}`
    );
    if (stored) {
      setSearchResult(JSON.parse(stored));
    }
    if (!stored) {
      // makes a fetch call directly from the url when search is not in local storage
      fetchData("search", keyword, setSearchResult, orderVal, numVal);
      navigate(`/search/${keyword}/${orderVal}/${numVal}`);
    }
  }, []);

  return (
    <div className="search-results">
      <h3 id="results-label">Results for: {keyword}</h3>
      <div className="videos">
        {searchResult.length > 1 &&
          searchResult.map(({ id }) => {
            return <VideoThumbnail key={id.videoId} videoId={id.videoId} />;
          })}
      </div>
    </div>
  );
}
