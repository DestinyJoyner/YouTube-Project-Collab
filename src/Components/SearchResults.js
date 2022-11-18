import { useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";

import VideoThumbnail from "./VideoThumbnail";

import { fetchData } from "../API/Fetch";

import "./SearchResults.css";

export default function SearchResults({
  searchResult,
  setSearchResult,
  setIsOpen,
  defaultOrder,
  defaultNum,
}) {
  const navigate = useNavigate();

  const { keyword } = useParams();
  const { order } = useParams();
  const { num } = useParams();

  const orderVal = defaultOrder ? "relevance" : order;
  const numVal = defaultNum ? 9 : num;

  console.log("keyword: ", keyword, " order: ", order, " num: ", num);

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
