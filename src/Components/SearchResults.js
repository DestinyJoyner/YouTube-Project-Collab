import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import VideoThumbnail from "./VideoThumbnail";

// import { fetchData } from "../API/Fetch";

import "./SearchResults.css";

// test useContext
import { useContext } from "react";
import { ContextData } from "../Provider/Provider";

export default function SearchResults({
  defaultOrder,
  defaultNum
}) {

  /* removed props from param:
    searchResult,
  setSearchResult,
  setIsOpen,
  */
  // test use Context
  const {darkMode, setDarkMode, fetchData, searchResult, setSearchResult, setIsOpen, darkStyles } = useContext(ContextData)


  const navigate = useNavigate();

  const { keyword } = useParams();
  const { order } = useParams();
  const { num } = useParams();

  const orderVal = defaultOrder ? "relevance" : order;
  const numVal = defaultNum ? 9 : num;
  
  useEffect(() => {
    const stored = window.localStorage.getItem(keyword);
    if (stored) {
      setSearchResult(JSON.parse(stored).items);
    }
    if (!stored) {
      // makes a fetch call directly from the url when search is not in local storage
      fetchData(
        "search",
        keyword,
        setSearchResult,
        setIsOpen,
        orderVal,
        numVal
      );
      navigate(`/search/${keyword}/${orderVal}/${numVal}`);
    }
  }, [keyword]);

  return (
    <>
      <h3 id="results-label">Results for: {keyword}</h3>
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
