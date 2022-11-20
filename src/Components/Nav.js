import React from "react";
import { Link } from "react-router-dom";
// test
import SearchBar from "./SearchBar";
import DarkModeButton from "../Provider/DarkModeButton";
import { useContext } from 'react';
import { ContextData } from "../Provider/Provider";


import youTubeLogo from "./assets/youTubeLogo.png";
import "./Nav.css";


function Nav() {
  /* removed props
    {searchInput, setSearchInput, searchResult, setSearchResult}
  */
// test
// const {darkMode, setDarkMode, darkStyles} = useContext(ContextData)

// testing for complete app coverage, no need for props
const {darkMode, setDarkMode, searchInput, setSearchInput, searchResult, setSearchResult, darkStyles } = useContext(ContextData)
// testing style for nav
  return (
    <nav 
    className="nav"
    style={ darkMode ? darkStyles : {}}>
      <img src={youTubeLogo} alt="youTube Logo" height="30px" />
      <h1>YouTube</h1>
      <Link to="/">
        <h2 className="h2-nav">Home</h2>
      </Link>
      <Link to="/about">
        <h2 className="h2-nav">About</h2>
      </Link>
       {/* test adding favorites link */}
       <Link to="/favorites">
        <h2 className="h2-nav">Favorites</h2>
      </Link>

      {/* testing putting searchbar inside Nav */}
      <SearchBar />
     
      {/* testing adding darkMode button */}
      <DarkModeButton
      darkMode = {darkMode}
      setDarkMode ={setDarkMode} />
    </nav>
  );
}

export default Nav;
