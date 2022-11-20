import React from 'react';
import lightining from '../lightining.png'
import rain from './rain.png'
import pix from './kratos-thor.gif'
import destiny from './short.png'
import dan from './test.png'


import "./EasterEgg.css"

function EasterEgg(props) {
    
    
    return (
        <div className = 'about'>
            
            <div className='lightining'
            style={{backgroundImage: `url(${lightining})`}}
            ></div>
            <div className='rain'
            style={{backgroundImage: `url(${rain})`}}></div>
            <div className='axe-hammer'><img 
            src = {pix}
            alt = 'collision' /></div>
             <h1><span className='first'>PROJECT </span><span className='second'>OVERKILL</span></h1>

            <div className="gallery">
           
            <article className='destinyEgg'>
                <img src={destiny} alt="destiny" />
                <p>
                    <li>Destiny</li>
                    <li>App Crusher</li>
                    <li>Web developer</li>
                </p>
                    </article>
            <article className='danEgg'>
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