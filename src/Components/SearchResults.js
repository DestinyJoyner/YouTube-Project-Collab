import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";

import VideoThumbnail from "./VideoThumbnail";
import "./VideoThumbnail.css"
import "./SearchBar.css"

export default function SearchResults({ searchResult,setSearchResult, searchInput, setSearchInput }) {
  const {keyword} = useParams()
  

  useEffect(() => {
    const stored = window.localStorage.getItem(keyword)
    if(stored){
      setSearchResult(JSON.parse(stored).items)
    }
    if(!stored){
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
    
    <h2>Results for : {keyword}</h2>
    <div className="videos">
      {searchResult &&
        searchResult.map((e) => {
           return <VideoThumbnail key={e.id.videoId} e= {e} videoId = {e.id.videoId} />  
        })}
    </div>
    </>
  );
}
