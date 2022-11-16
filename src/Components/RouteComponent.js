import React from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AboutMe from "../TestFolder/AboutMe";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Video from "./Video";

function RouteComponent() {
/* 
  searchInput,
  setSearchInput,
  searchResult,
  setSearchResult, */
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);


  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <SearchBar
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          }
        />
        <Route path="about" element={<>About</>} />

        <Route path="search">
          <Route index element={<Navigate to="/" />} />
          <Route
            path=":keyword"
            element={
              <SearchResults
                searchResult={searchResult}
                setSearchResult={setSearchResult}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            }
          />
        </Route>

        <Route path="videos">
          <Route index element={<AboutMe />} />
          <Route path=":id" element={<Video />} />
          <Route path ="page" element ={<>page</>} />
        </Route>
        
        <Route path="*" element={<>Error</>} />
      </Route>
    </Routes>
  );
}

export default RouteComponent;
