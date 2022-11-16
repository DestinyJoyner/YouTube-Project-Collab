import React from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Video from "./Video";
import Modal from "./Modal";

function RouteComponent({
  searchInput,
  setSearchInput,
  searchResult,
  setSearchResult,
  isOpen,
  setIsOpen,
}) {
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
              setIsOpen={setIsOpen}
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
          {/* <Route index element={<Navigate to="/" />} /> */}
          <Route index element={<button className="test-modal" onClick={() => setIsOpen(true)}>open modal</button>} />
          <Route path=":id" element={<Video />} />
        </Route>
        <Route
          path="*"
          element={<Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
      </Route>
    </Routes>
  );
}

export default RouteComponent;
