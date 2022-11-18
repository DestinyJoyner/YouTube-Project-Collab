import React from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Video from "./Video";
import ModalTrigger from "./ModalTrigger";
import Home from "./Home";

function RouteComponent({
  searchInput,
  setSearchInput,
  searchResult,
  setSearchResult,
  setIsOpen,
}) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <>
              <SearchBar
                searchResult={searchResult}
                setSearchResult={setSearchResult}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                setIsOpen={setIsOpen}
              />
              <Home setIsOpen={setIsOpen} />
            </>
          }
        />
        <Route path="about" element={<>About</>} />

        <Route path="search">
          <Route index element={<Navigate to="/" />} />
          <Route
            path=":keyword"
            element={
              <>
                <SearchBar
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  setSearchResult={setSearchResult}
                />
                <SearchResults
                  searchResult={searchResult}
                  setSearchResult={setSearchResult}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  setIsOpen={setIsOpen}
                  defaultOrder={true}
                  defaultNum={true}
                />
              </>
            }
          />
          <Route
            path=":keyword/:order"
            element={
              <>
                <SearchBar
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  setSearchResult={setSearchResult}
                />
                <SearchResults
                  searchResult={searchResult}
                  setSearchResult={setSearchResult}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  setIsOpen={setIsOpen}
                  defaultNum={true}
                />
              </>
            }
          />
          <Route
            path=":keyword/:order/:num"
            element={
              <>
                <SearchBar
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  setSearchResult={setSearchResult}
                />

                <SearchResults
                  searchResult={searchResult}
                  setSearchResult={setSearchResult}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  setIsOpen={setIsOpen}
                />
              </>
            }
          />
        </Route>

        <Route path="videos">
          <Route index element={<Navigate to="/" />} />
          <Route path=":id" element={<Video />} />
        </Route>
        <Route
          path="*"
          element={<ModalTrigger isTrue={true} setIsOpen={setIsOpen} />}
        />
      </Route>
    </Routes>
  );
}

export default RouteComponent;
