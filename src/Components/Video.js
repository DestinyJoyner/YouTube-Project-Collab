import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube'
import Checkbox from '../TestFolder/Checkbox';
import Favorites from '../TestFolder/Favorites';
import "./Video.css"


function Video() {
    const {id} = useParams()
    const opts = {
        height: 400,
        width: 800,  
    }

    // test coding
    const [checked, setChecked] = useState(false)
    const [videoList, setVideoList] = useState([])
    
    
    return (
        <div className='video'>
            <YouTube videoId= {id} opts = {opts} />

            {/* test code here */}
            <Checkbox
            checked = {checked} 
            setChecked={setChecked}
            id = {id}
            videoList = {videoList}
            setVideoList = {setVideoList}
            />

            <Favorites videoList = {videoList}
            checked = {checked} />
            
            

        </div>
    );
}

export default Video;