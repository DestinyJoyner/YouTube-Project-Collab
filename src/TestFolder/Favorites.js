import React from 'react';
import { useEffect, useState } from 'react';
import {FaStar} from 'react-icons/fa'
import './Favorites.css'

function Favorites({videoList, checked}) {
// Test state for favorite -> video interaction
const [favorites, setFavorites] = useState([])
    
useEffect(()=> {
    setFavorites([...videoList])
    }, [videoList.length])
    return (
       <aside>
            <h4><FaStar/>Favorite Video Picks<FaStar/></h4>
            <ul>
                {
                    favorites.map(fav => <li>{fav}</li>)
                }
            </ul>
       </aside>
    );
}

export default Favorites;