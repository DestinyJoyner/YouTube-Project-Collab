import React from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube'
import "./Video.css"

function Video() {
    const {id} = useParams()
    const opts = {
        height: 400,
        width: 500,
       
    }
    
    return (
        <div className='video'>
            <YouTube videoId= {id} opts = {opts} />
        </div>
    );
}

export default Video;