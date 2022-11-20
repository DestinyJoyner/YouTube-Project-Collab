import React from 'react';


function DarkModeButton({darkMode, setDarkMode}) {
    
    return (
        <button 
        style={{
            borderRadius: '20px',
            border: '2px solid #e8e5e5',
            backgroundColor: '#f8f8f8',
            width: '100px',
            

        }}
        type= "button"
        onClick={() => setDarkMode(!darkMode)}>
            {!darkMode ? `Dark Mode` : `Light Mode`}
        
        </button>
    );
}

export default DarkModeButton;