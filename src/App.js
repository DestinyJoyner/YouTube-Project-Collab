import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import RouteComponent from "./Components/RouteComponent";
import Footer from "./Components/Footer"
import Nav from "./Components/Nav";
import SearchBar from "./Components/SearchBar";
import './App.css';
import SearchResults from "./Components/SearchResults";

function App() {

  /* comment out before merge*/

  const dogs = window.localStorage.getItem(`dogs`)
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div className="App">
      <Nav />

      <RouteComponent
      searchInput={searchInput} 
      setSearchInput={setSearchInput} 
      setSearchResult={setSearchResult}
      searchResult = {searchResult} 
      /> 
      {/* <Routes>
        <Route path = "/" element = {<SearchBar searchInput={searchInput} setSearchInput={setSearchInput} setSearchResult={setSearchResult}/>} />

        <Route path = "/about" element = {<>About</>} />

        <Route path="/search/:keyword" element = {< SearchResults searchResult={searchResult}/>}  />

        <Route path="/video:id" element = {<>Video Player</>} />

        <Route path = "*" element = {<>Error</>}/>

      </Routes> */}
      
      <Footer />
     
    </div>
  );
}

export default App;
