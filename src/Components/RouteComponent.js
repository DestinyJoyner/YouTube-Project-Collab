import React from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// no more searchbar -> is in NavComponent
// import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Video from "./Video";
import ModalTrigger from "./ModalTrigger";
import Home from "./Home";
import EasterEgg from "../Easter Egg/EasterEgg";

// test 
// import { useContext } from "react";
// import { ContextData } from "../Provider/Provider";

function RouteComponent() {
  /* Removed props from route params:
    {
  searchInput,
  setSearchInput,
  searchResult,
  setSearchResult,
  setIsOpen,
}
  
  */
  // test pull variables from useContext -> used Same state names
  // const {darkMode, setDarkMode, searchInput, setSearchInput, searchResult, setSearchResult, isOpen, setIsOpen, darkStyles } = useContext(ContextData)

  return (

    <Routes>
    <Route path="/">
      <Route index element={ <Home  /> }/>
      <Route path="about" element={<>About</>} />
      <Route path="favorites" element={<>Favorites</>} />
      <Route path="overkill" element={<EasterEgg/>} />

      <Route path="search">
        <Route index element={<Navigate to="/" />} />
        <Route path=":keyword" element={ <SearchResults defaultOrder={true} defaultNum={true}/>}/>
        <Route path=":keyword/:order" element={<SearchResults defaultNum={true}/>} /> 
        <Route path=":keyword/:order/:num" element={ <SearchResults /> } />
      </Route>

      <Route path="videos">
        <Route index element={<Navigate to="/" />} />
        <Route path=":id" element={<Video />} />
      </Route>
      <Route
        path="*"
        element={<ModalTrigger isTrue={true}  />}
      />
    </Route>
  </Routes>
    
  );
}

export default RouteComponent;

// <Routes>
    //   <Route path="/">
    //     <Route
    //       index
    //       element={
    //         <>
    //           {/* <SearchBar
    //             searchResult={searchResult}
    //             setSearchResult={setSearchResult}
    //             searchInput={searchInput}
    //             setSearchInput={setSearchInput}
    //             setIsOpen={setIsOpen}
    //           /> */}
    //           <Home setIsOpen={setIsOpen} />
    //         </>
    //       }
    //     />
    //     <Route path="about" element={<>About</>} />

    //     <Route path="search">
    //       <Route index element={<Navigate to="/" />} />
    //       <Route
    //         path=":keyword"
    //         element={
    //           <>
    //             {/* <SearchBar
    //               searchInput={searchInput}
    //               setSearchInput={setSearchInput}
    //               setSearchResult={setSearchResult}
    //             /> */}
    //             <SearchResults
    //               searchResult={searchResult}
    //               setSearchResult={setSearchResult}
    //               searchInput={searchInput}
    //               setSearchInput={setSearchInput}
    //               setIsOpen={setIsOpen}
    //               defaultOrder={true}
    //               defaultNum={true}
    //             />
    //           </>
    //         }
    //       />
    //       <Route
    //         path=":keyword/:order"
    //         element={
    //           <>
    //             {/* <SearchBar
    //               searchInput={searchInput}
    //               setSearchInput={setSearchInput}
    //               setSearchResult={setSearchResult}
    //             /> */}
    //             <SearchResults
    //               searchResult={searchResult}
    //               setSearchResult={setSearchResult}
    //               searchInput={searchInput}
    //               setSearchInput={setSearchInput}
    //               setIsOpen={setIsOpen}
    //               defaultNum={true}
    //             />
    //           </>
    //         }
    //       />
    //       <Route
    //         path=":keyword/:order/:num"
    //         element={
    //           <>
    //             {/* <SearchBar
    //               searchInput={searchInput}
    //               setSearchInput={setSearchInput}
    //               setSearchResult={setSearchResult}
    //             /> */}

    //             <SearchResults
    //               searchResult={searchResult}
    //               setSearchResult={setSearchResult}
    //               searchInput={searchInput}
    //               setSearchInput={setSearchInput}
    //               setIsOpen={setIsOpen}
    //             />
    //           </>
    //         }
    //       />
    //     </Route>

    //     <Route path="videos">
    //       <Route index element={<Navigate to="/" />} />
    //       <Route path=":id" element={<Video />} />
    //     </Route>
    //     <Route
    //       path="*"
    //       element={<ModalTrigger isTrue={true} setIsOpen={setIsOpen} />}
    //     />
    //   </Route>
    // </Routes>