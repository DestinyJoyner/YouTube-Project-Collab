import React from 'react';
import './AboutMe.css'
// import pix from "./Kratos-Thor.gif"
import profile from './fire-shades-avatar.gif'

function AboutMe(props) {
   

    
    return (
        <div className='aboutMe'>
        <h1><span className= "destiny">Destiny</span>  <span id ="dan">Dan</span></h1>
        <div class="gallery">
            <article className='destiny'>
                <img src={profile} alt="destiny" className='destinypic'
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


// // <img 
// src = {pix}
// alt = 'collision'
// className='collision' />
{/*        <div className = 'about'>
            
            <div className='lightining'></div>
            <div className='rain'></div>
            <div className='axe-hammer'><img 
            src = {pix}
            alt = 'collision' /></div>
        </div> */ }


export default AboutMe;