import React from 'react';
import moon from './Moon.png'
import sun from './Sun.png'
import './DarkModeButton.css'

// <button class="btn edit btn-primary" />
/* 
 fa-sun-o"\f185"
 fa-moon-o"\f186" */
/* you -tube icons : 
fa-youtube-square"\f166"
 fa-youtube"\f167" */
function DarkModeButton({darkMode, setDarkMode}) {
    
    return (
        <button 
        style={{
            borderRadius: '20px',
            border: '2px solid #e8e5e5',
            backgroundColor: '#f8f8f8',
        }}
        type= "button"
        onClick={() => setDarkMode(!darkMode)}>
            <img 
            src= {!darkMode ? moon : sun}
            alt = {!darkMode? 'darkmode' : 'lightmode'} />
        </button>
    );
}

export default DarkModeButton;