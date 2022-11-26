
import { useContext, useEffect } from 'react';
import { ContextData } from './Provider';
import { Link } from 'react-router-dom';
import './Favorites.css'
import noImage from '../Components/assets/no-image-dark.png'


function Favorites(props) {
    const {favorites, setFavorites} = useContext(ContextData)
    // const stored = JSON.parse(window.localStorage.getItem(`favorites`))
    // useEffect(() =>{
    //     const stored = window.localStorage.getItem(`favorites`)
    //     if(stored){
    //         setFavorites(JSON.parse(stored))
    //     }
    // },[])
    return (
        <div className='favorites'>
            <section>
                <img src={ favorites.length ? favorites[0].image : noImage } alt ='video-thumbnail'/>
                <h3>⭐Favorite Videos⭐</h3>
                <p>{favorites.length} {favorites.length === 1 ? `video` : `videos`}</p>
            </section>
            <ol>
            {
                favorites.map(({vidId, title, image, chanName, chanId}) => 
                <Link to = {`/videos/${vidId}`}>
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