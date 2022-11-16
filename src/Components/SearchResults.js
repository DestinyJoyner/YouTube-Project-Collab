import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";

import VideoThumbnail from "./VideoThumbnail";
import "./SearchResults.css"
import Favorites from "../TestFolder/Favorites";

export default function SearchResults({ searchResult,setSearchResult, searchInput, setSearchInput, favorites }) {
  const {keyword} = useParams()
  

  useEffect(() => {
    const stored = window.localStorage.getItem(keyword)
    if(stored){
      setSearchResult(JSON.parse(stored).items)
    }
    if(!stored){
      // add fetch from keyword param
      setSearchResult([])
    }
    console.log("useEffect");
  }, [keyword]);
  
  return (
    <>
    <SearchBar
    searchInput={searchInput} 
    setSearchInput={setSearchInput} 
    setSearchResult={setSearchResult}/>
    
    
    <h2 id="results-label">Results for : {keyword}</h2>

      
      <div className="videos">
      {searchResult &&
        searchResult.map((video) => {
           return <VideoThumbnail key={video.id.videoId} video= {video} videoId = {video.id.videoId} />  
        })}
      </div>
    
  
    
    </>
  );
}
