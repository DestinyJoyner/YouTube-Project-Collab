import React from 'react';
import lightining from './lightining.png'
import rain from './rain.png'
import pix from './kratos-thor.gif'
import destiny from './blue lightsaber.png'
import dan from './bicycle kick.png'
import quota from '../Components/assets/quota-bar.jpg'
import "./EasterEgg.css"
import '../Fonts/GODOFWAR.TTF'

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
             <h1><span className='first'>PROJECT </span><span className='second'>OVERKILL</span><br/><img id="quota" src={quota} alt="quota bar"></img></h1> 

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