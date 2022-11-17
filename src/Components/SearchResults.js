import { useEffect } from "react";
import { useParams } from "react-router-dom";

import VideoThumbnail from "./VideoThumbnail";

import { fetchData } from "../API/Fetch";

import "./SearchResults.css";

export default function SearchResults({
  searchResult,
  setSearchResult,
  setIsOpen,
}) {
  const { keyword } = useParams();

  useEffect(() => {
    const stored = window.localStorage.getItem(keyword);
    if (stored) {
      setSearchResult(JSON.parse(stored).items);
    }
    if (!stored) {
      // makes a fetch call directly from the url when search is not in local storage
      fetchData("search", keyword, setSearchResult, setIsOpen, "relevance", 9);
    }
    ;
  }, [keyword]);

  return (
    <>
      <h2 id="results-label">Results for : {keyword}</h2>
      <div className="videos">
        {searchResult &&
          searchResult.map((video) => {
            return (
              <VideoThumbnail
                key={video.id.videoId}
                video={video}
                videoId={video.id.videoId}
              />
            );
          })}
      </div>
    </>
  );
}
