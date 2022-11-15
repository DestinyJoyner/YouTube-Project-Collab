import React, { useEffect, useState } from 'react';

function SearchIndex({e}) {
const [data, setData] = useState({})
/* this fetch w/ 'statistics gives viewcount
    https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=ZtHCnXMjIXY&maxResults=25&key=AIzaSyBPnE3WELPDQRQlYWCpMDN9Gw_B5GjcoEE
*/
    // useEffect(() => {
    //     fetch(``)
    //     .then(resp => resp.json())
    //     .then( respJson => setData(respJson))
    //     .catch(err => console.log(err))
    // }, [])
    return (
        <div className='videoThumbnail'>
            <p>{e.snippet.title}</p>
            <img 
            src={e.snippet.thumbnails.default.url} 
            alt= {e.snippet.title} />
            <p>Index</p>
            
        </div>
    );
}

export default SearchIndex;