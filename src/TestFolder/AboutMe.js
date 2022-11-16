import React from 'react';
import './AboutMe.css'
import pix from "./Kratos-Thor.gif"

function AboutMe(props) {
    
    
    return (
        <div className = 'about'>
            <div className='lightining'></div>
            <div className='rain'></div>
            <div className='axe-hammer'><img 
            src = {pix}
            alt = 'collision' /></div>
        </div>
       
    );
}

export default AboutMe;