import React, { useEffect, useState } from 'react';

function VideoThumbnail({e, videoId}) {
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
            <p>{e.snippet.title}</p>
            <img 
            src={e.snippet.thumbnails.default.url} 
            alt= {e.snippet.title} />
            <p>Views: {views}</p>
            
        </div>
    );
}

export default VideoThumbnail;