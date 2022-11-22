import React from 'react';
import moon from './Moon.png'
import sun from './Sun.png'
import './DarkModeButton.css'

function DarkModeButton({darkMode, setDarkMode}) {
    
    return (
        <button 
        type= "button"
        onClick={() => setDarkMode(!darkMode)}>
            <img 
            src= {!darkMode ? moon : sun}
            alt = {!darkMode? 'darkmode' : 'lightmode'} />
        </button>
    );
}

export default DarkModeButton;