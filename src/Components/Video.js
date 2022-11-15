import React from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube'
import "./Video.css"

function Video(props) {
    const {id} = useParams()
    
    return (
        <div className='video'>
            <YouTube videoId= {id} />
        </div>
    );
}

export default Video;