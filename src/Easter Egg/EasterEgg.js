import React from 'react';
import rain from './rain.png'
import pix from './kratos-thor.gif'
import destiny from './short.png'
import dan from './test.png'


import "./EasterEgg.css"

function EasterEgg(props) {
    
    
    return (
        <div className = 'about'>
            
            <div className='lightining'
            ></div>
            <div className='rain'
            style={{backgroundImage: `url(${rain})`}}></div>
            <div className='axe-hammer'><img 
            src = {pix}
            alt = 'collision' /></div>
             <h1><span id = "destiny">Destiny</span>  <span id ="dan">Dan</span></h1>

            <div className="gallery">
           
            <article className='destiny'>
                <img src={destiny} alt="destiny" />
                <p>
                    <li>Destiny</li>
                    <li>App Crusher</li>
                    <li>Web developer</li>
                </p>
                    </article>
            <article className='dan'>
                <img src={dan} alt="danpic"/>
                <p>
                    <li>Dan</li>
                    <li>App Crusher</li>
                    <li>Web developer</li>
                </p>
            </article>
        </div>
        </div>
    );
}

export default EasterEgg;