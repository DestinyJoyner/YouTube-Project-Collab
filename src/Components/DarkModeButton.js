import { useContext } from 'react';
import { ContextData } from '../Provider/Provider';
import moon from './assets/Moon.png'
import sun from './assets/sun-icon.png'
import './DarkModeButton.css'

function DarkModeButton() {
    const {darkMode, setDarkMode} = useContext(ContextData)
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