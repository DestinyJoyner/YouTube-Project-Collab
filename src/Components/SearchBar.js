import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dropdown from "./Dropdown";

import { fetchData } from "../API/Fetch";
import searchIcon from "./assets/Search-icon.png"
import "./SearchBar.css";

export default function SearchBar({
  searchInput,
  setSearchInput,
  setSearchResult,
  setIsOpen,
}) {
  
  const [numResults, setNumResults] = useState("9")
  const [order, setOrder] = useState("relevance")
  const navigate = useNavigate();


  return (
    <>
   
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchResult([]);
        fetchData("search", searchInput, setSearchResult, setIsOpen, order, numResults);
        navigate(`/search/${searchInput}/${order}/${numResults}`);
        setSearchInput("")
        setNumResults("9")
      }}
    >
      <input
        className="textbox"
        type="text"
        placeholder="Enter Keyword(s) Here..."
        value={searchInput}
        onChange={(e) => { setSearchInput(e.target.value);}}
      />
      <input
        type="image"
        alt="search"
        src={searchIcon}
        className="button"
      ></input>
    </form>

    <Dropdown 
    value = {"order"} 
    title = {"Sort By: "} 
    optionValue ={['relevance', 'date', `viewCount`]} 
    optionName ={['Relevance', `Most Recent`, `Most Viewed`]}
    stateVar = {order}
    setFunction={setOrder} />  

    <Dropdown 
    value = {"maxResults"} 
    title = {"Number of Results: "} 
    optionValue ={["9","18","27","36","45"]} 
    optionName ={["9","18","27","36","45"]}
    stateVar = {numResults}
    setFunction={setNumResults}  />
 
    </>
    
  );
}
