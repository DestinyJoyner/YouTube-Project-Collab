import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./VideoThumbnail.css";

function VideoThumbnail({ video, videoId}) {
  const [views, setViews] = useState("");

  // function to convert views number
  function convertNumber(num) {
    return num
      .split(``)
      .reverse()
      .join(``)
      .match(/.{1,3}/g)
      .join(`,`)
      .split(``)
      .reverse()
      .join(``);
  }

  function convertDate(str) {
    let date = str.slice(2, 10).split("-");
    date.push(date[0]);
    date.shift();
    return date.join("/");
  }

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoId}&maxResults=1&key=${process.env.REACT_APP_API_KEY}`
    )
      .then((resp) => resp.json())
      .then((respJson) => {
        setViews(convertNumber(respJson.items[0].statistics.viewCount));
        const videoFetchData = `video ${videoId}`;
        window.localStorage.setItem(videoFetchData, JSON.stringify(respJson));
      })
      .catch((err) => console.log(err));
  }, [videoId]);

  return (
    <div className="videoThumbnail">
      <Link to={`/videos/${videoId}`}>
        <img
          src={video.snippet.thumbnails.high.url}
          alt={video.snippet.title}
        />{" "}
        <p id="title">{video.snippet.title}</p>
        <p className="views">
          {views} views{" "}
          <span>date added: {convertDate(video.snippet.publishedAt)}</span>
        </p>
      </Link>
    </div>
  );
}

export default VideoThumbnail;
