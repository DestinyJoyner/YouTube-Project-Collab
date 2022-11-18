import React from "react";
import { Link } from "react-router-dom";
import youTubeLogo from "./assets/youTubeLogo.png";
import "./Nav.css";

function Nav() {
  return (
    <nav className="nav">
      <img src={youTubeLogo} alt="youTube Logo" height="30px" />
      <h1>YouTube</h1>
      <Link to="/">
        <h2 className="h2-nav">Home</h2>
      </Link>
      <Link to="/about">
        <h2 className="h2-nav">About</h2>
      </Link>
    </nav>
  );
}

export default Nav;
