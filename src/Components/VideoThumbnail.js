import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { convertNumber, convertDate } from "../Functions/functions.js"
import "./VideoThumbnail.css";

function VideoThumbnail({ video, videoId}) {
  // const [views, setViews] = useState("");

  // useEffect(() => {
  //   fetch(
  //     `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoId}&maxResults=1&key=${process.env.REACT_APP_API_KEY}`
  //   )
  //     .then((resp) => resp.json())
  //     .then((respJson) => {
  //       setViews(convertNumber(respJson.items[0].statistics.viewCount));
  //       const videoFetchData = `video ${videoId}`;
  //       window.localStorage.setItem(videoFetchData, JSON.stringify(respJson));
  //     })
  //     .catch((err) => console.log(err));
  // }, [videoId]);

  return;
  // (
  //   <div className="videoThumbnail">
  //     <Link to={`/videos/${videoId}`}>
  //       <img
  //         src={video.snippet.thumbnails.high.url}
  //         alt={video.snippet.title}
  //       />{" "}
  //       <p id="title">{video.snippet.title}</p>
  //       <p className="views">
  //         {views} views{" "}
  //         <span>date added: {convertDate(video.snippet.publishedAt)}</span>
  //       </p>
  //     </Link>
  //   </div>
  // );
}

export default VideoThumbnail;
