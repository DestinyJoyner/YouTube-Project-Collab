import React from 'react';
import { Link } from 'react-router-dom';
import youTubeLogo from "./assets/youTubeLogo.png"
import "./Nav.css"

function Nav(props) {
    return (
        <nav className='nav'>
            <img src={youTubeLogo} alt="youTube Logo" height="30px"/>
            <h1>YouTube</h1>
            <Link to = "/" ><h2>Home</h2></Link>
            <Link to = "/about"><h2>About</h2></Link>



        </nav>
    );
}

export default Nav;