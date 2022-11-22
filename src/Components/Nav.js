import { useContext } from "react";
import { Link } from "react-router-dom";

import { ContextData } from "../Provider/Provider";
import SearchBar from "./SearchBar";
import DarkModeButton from "../Provider/DarkModeButton";

import youTubeLogo from "./assets/youTubeLogo.png";
import "./Nav.css";

function Nav() {
  const { darkMode, setDarkMode, darkStyles } = useContext(ContextData);

  // place ternary in className and move to .css for dark mode toggle
  return (
    <nav className="nav" style={darkMode ? darkStyles : {}}>
      <Link to="/">
        <img src={youTubeLogo} alt="youTube Logo" height="30px" />
        <h1>YouTube</h1>
      </Link>
      <Link to="/favorites">
        <h2 className="h2-nav">Favorites</h2>
      </Link>
      <SearchBar />
      <Link to="/about">
        <h2 className="h2-nav">About</h2>
      </Link>

      {/* darkMode button */}
      <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
    </nav>
  );
}

export default Nav;
