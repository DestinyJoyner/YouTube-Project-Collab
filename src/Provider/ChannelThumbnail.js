import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from './helperFunctions';

function ChannelThumbnail({obj}) {
    return (
        <div className="videoThumbnail">
      <Link 
      to={`/video/${obj.id.videoId}`}>
          <img
          src={obj.snippet.thumbnails.high.url}
          alt={obj.snippet.title}
        />{" "}
        <p id="title">{obj.snippet.title}</p>
        <p className="views">
          {/* {convertNumber(obj.statistics.viewCount)}  */}views{" "}
          <span>date added: {convertDate(obj.snippet.publishedAt)}</span>
        </p>
        
      </Link>
    </div>
    );
}

export default ChannelThumbnail;