
import { useContext, useEffect } from 'react';
import { ContextData } from '../Provider/Provider';
import { Link } from 'react-router-dom';
import './Favorites.css'
import noImage from './assets/no-image-dark.png'


function Favorites(props) {
    const {favData, setFavData} = useContext(ContextData)

    useEffect(()=> {
        const stored = JSON.parse(window.localStorage.getItem(`favorites`))
        console.log(stored)
        setFavData(stored)    
    },[favData.length])
    return (
        <div className='favorites'>
          
            <section>
                <img src={ favData.length ? favData[0].image : noImage } alt ='video-thumbnail'/>
                <h3>⭐Favorite Videos⭐</h3>
                <p>{favData.length} {favData.length === 1 ? `video` : `videos`}</p>
            </section>
            
            <ol>
            {
                favData.map(({vidId, title, image, chanName, chanId}) => 
                <Link to = {`/video/${vidId}`}>
                    <li key = {vidId}>
                        <img src ={image} alt ='vid-thumbnail'/>
                        <h3>{title}</h3>
                        <p>{chanName}</p> 
                    </li>
                </Link>)
            }
       </ol>
        </div>
       
    );
}

export default Favorites;