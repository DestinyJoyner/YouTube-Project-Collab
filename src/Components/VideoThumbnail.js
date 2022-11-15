import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function VideoThumbnail({video, videoId}) {
const [views, setViews] = useState("")
/* this fetch w/ 'statistics gives viewcount
    https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=ZtHCnXMjIXY&maxResults=25&key=AIzaSyBPnE3WELPDQRQlYWCpMDN9Gw_B5GjcoEE
*/
    useEffect(() => {
        fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoId}&maxResults=25&key=${process.env.REACT_APP_API_KEY}`)
        .then(resp => resp.json())
        .then( respJson => setViews(respJson.items[0].statistics.viewCount))
        .catch(err => console.log(err))
    }, [videoId])

    return (
        <div className='videoThumbnail'>
            <Link to = {`/videos/${videoId}`}><p>{video.snippet.title}</p></Link>
            <img 
            src={video.snippet.thumbnails.default.url} 
            alt= {video.snippet.title} />
            <p>Views: {views}</p>
            
        </div>
    );
}

export default VideoThumbnail;