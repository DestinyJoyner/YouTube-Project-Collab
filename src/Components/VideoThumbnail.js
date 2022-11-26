import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ContextData } from "../Provider/Provider.js";
import { convertNumber, convertDate, videoThumbnailEmpty } from "../Functions/functions.js"
import "./VideoThumbnail.css";

function VideoThumbnail({videoId}) {
  const {vidData, setVidData, relatedVids, setRelatedVids, channel, setChannel} = useContext(ContextData)
  const [thisVideo, setThisVideo] = useState(videoThumbnailEmpty)

useEffect(() => {
  const stored = JSON.parse(window.localStorage.getItem(`views-${videoId}`)) 
  setThisVideo(stored)
  
  },[videoId])

  return (
    <div 
    className="videoThumbnail"
    >
      <Link 
      to={`/video/${videoId}`}>
        {
          thisVideo.items.map(obj => <>
          <img
          src={obj.snippet.thumbnails.high.url}
          alt={obj.snippet.title}
        />{" "}
        <p id="title">{obj.snippet.title}</p>
        <p className="views">
          <span>{obj.statistics.viewCount ? convertNumber(obj.statistics.viewCount) : null} views{" "}</span>
          <span>date added: {convertDate(obj.snippet.publishedAt)}</span>
        </p>
          </>
            
          )
        }
      </Link>
    </div>
  )
}

export default VideoThumbnail;

{/* <img
          src={thisVideo.items[0].snippet.thumbnails.high.url}
          alt={thisVideo.items[0].snippet.title}
        />{" "}
        <p id="title">{thisVideo.items[0].snippet.title}</p>
        <p className="views">
          {convertNumber(thisVideo.statistics.viewCount)} views{" "}
          <span>date added: {convertDate(thisVideo.items[0].snippet.publishedAt)}</span>
        </p> */}