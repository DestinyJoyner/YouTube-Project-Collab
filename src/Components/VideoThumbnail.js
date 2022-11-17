import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./VideoThumbnail.css";
function VideoThumbnail({ video, videoId }) {
  const [views, setViews] = useState("");
  /* this fetch w/ 'statistics gives viewcount
    https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=ZtHCnXMjIXY&maxResults=25&key=
*/
  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoId}&maxResults=1&key=${process.env.REACT_APP_API_KEY}`
    )
      .then((resp) => resp.json())
      .then((respJson) => setViews(respJson.items[0].statistics.viewCount))
      .catch((err) => console.log(err));
  }, [videoId]);

  return (
    <div className="videoThumbnail">
      <Link to={`/videos/${videoId}`}>
        <p id="title">{video.snippet.title}</p>
        <img
          src={video.snippet.thumbnails.high.url}
          alt={video.snippet.title}
        />
        <p className="views">Views: {views}</p>
      </Link>
    </div>
  );
}

export default VideoThumbnail;
