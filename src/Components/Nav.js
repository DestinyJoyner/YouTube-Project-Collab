import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContextData } from "../Provider/Provider";
import SearchBar from "./SearchBar";
import DarkModeButton from "./DarkModeButton";
import youTubeLogo from "./assets/youTubeLogo.png";
import darkLogo from "./assets/dark-logo(2).png";
import "./Nav.css";

function Nav() {
  const { darkMode, setDarkMode, darkStyles } = useContext(ContextData);

  return (
    <nav className={darkMode ? "darkMode nav" : "nav"}>
      <Link to="/">
        <div className="logo-home">
          <img
            src={!darkMode ? youTubeLogo : darkLogo}
            alt="youTube Logo"
            height="30px"
          />
          <h1>YouTube</h1>
        </div>
      </Link>
      <Link to="/favorites">
        <h2 className="h2-nav">Favorites</h2>
      </Link>
      <SearchBar />
      <Link to="/about">
        <h2 className="h2-nav">About</h2>
      </Link>
      <DarkModeButton />
    </nav>
  );
}

export default Nav;
