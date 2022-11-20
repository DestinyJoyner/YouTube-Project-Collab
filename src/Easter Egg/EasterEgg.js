import React from 'react';
import pix from './kratos-thor.gif'
import destiny from './gaming-in-chair.png'

function EasterEgg(props) {
    return (
        <div className = 'about'>
            
            <div className='lightining'></div>
            <div className='rain'></div>
            <div className='axe-hammer'><img 
            src = {pix}
            alt = 'collision' /></div>
             <h1><span id = "destiny">Destiny</span>  <span id ="dan">Dan</span></h1>

            <div class="gallery">
           
            <article className='destiny'>
                <img src={destiny} alt="destiny" className='destinypic'
                />
                <p>
                    <li>Destiny</li>
                    <li>App Crusher</li>
                    <li>Web developer</li>
                </p>
                    </article>
            <img src="https://assets.codepen.io/1480814/saber.jpg" alt="Saber from Fate/Stay"/>
        </div>
        </div>
    );
}

export default EasterEgg;