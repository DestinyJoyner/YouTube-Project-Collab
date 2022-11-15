import React from 'react';
import './AboutMe.css'
import pix from "./Kratos-Thor.gif"

function AboutMe(props) {
    
    
    return (
        <>
        <div className='lightining'></div>
        <div className='rain'></div>
        <div className='axe-hammer'><img 
        src = {pix}
         alt = 'collision' /></div>
         
         
        </>
       
    );
}

export default AboutMe;