import React from 'react';
import { Link } from 'react-router-dom';
import "./Nav.css"

function Nav(props) {
    return (
        <nav className='nav'>
            <h1>YouTube</h1>
            <Link to = "/" ><h2>Home</h2></Link>
            <Link to = "/about"><h2>About</h2></Link>



        </nav>
    );
}

export default Nav;