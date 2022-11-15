import React from 'react';
import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import SearchBar from './SearchBar';
import SearchIndex from './SearchIndex';
import SearchResults from './SearchResults';

function RouteComponent({searchInput, setSearchInput, searchResult, setSearchResult}) {

{/* <RouteComponent
      searchInput={searchInput} 
      setSearchInput={setSearchInput} 
      setSearchResult={setSearchResult} 
      /> */}

    return (
        <Routes>
        <Route path = "/" >
            <Route index element = {< SearchBar 
                            searchResult={searchResult} 
                            setSearchResult = {setSearchResult}
                            searchInput={searchInput} 
                            setSearchInput={setSearchInput} />} />
            <Route path = "about" element = {<>About</>} />
            
            <Route path = "search" >
                <Route index element = {<Navigate to = "/" />} />
                <Route path=":keyword" element = {< SearchResults 
                searchResult={searchResult} 
                setSearchResult = {setSearchResult}
                searchInput={searchInput} 
                setSearchInput={setSearchInput} />}  />
            </Route>

            <Route path = "videos">
                <Route index element = {<SearchIndex />} />
                <Route path = ":id" element = {<>Video Player</>} />

            </Route>
            <Route path = "*" element = {<>Error</>} />

        
        </Route>


      </Routes>
    );
}

export default RouteComponent;