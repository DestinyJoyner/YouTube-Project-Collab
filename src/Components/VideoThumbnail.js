import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ContextData } from "../Provider/Provider.js";
import { convertNumber, convertDate, videoThumbnailEmpty } from "../Functions/functions.js"
import "./VideoThumbnail.css";

function VideoThumbnail({videoId}) {
  const {vidData, setVidData, relatedVids, setRelatedVids, channel, setChannel} = useContext(ContextData)
  const [thisVideo, setThisVideo] = useState(videoThumbnailEmpty)

  // test onclick
  // function handleOnClick(e) {
  //   console.log(e.target.id)
  //   // const videoData = JSON.parse(window.localStorage.getItem(`views-${e.target.id}`))
  //   // const relatedVideoData = videoData.items[0].snippet.channelId
  //   // console.log(relatedVideoData)
  //   // const moreChannelData = JSON.parse(window.localStorage.getItem(`channel-${relatedVideoData}`))
  //   // setVidData(videoData)
  //   // setRelatedVids(JSON.parse(window.localStorage.getItem(`related-to-video-${e.target.id}`)))
  //   // setChannel(moreChannelData)
  // }

useEffect(() => {
  const stored = JSON.parse(window.localStorage.getItem(`views-${videoId}`)) 
  if(videoId === 'H3Oj7ky4hYU'){
    setThisVideo(videoThumbnailEmpty)
  }
  else {
    setThisVideo(stored)
  }
  },[videoId])

// add on click to videoThumbnail to set up info for video.js page
  return (
    <div 
    className="videoThumbnail"
    >
      <Link 
      to={`/video/${videoId}`}
      /* onClick = {(event) => handleOnClick(event)} */>
        {
          thisVideo.items.map(obj => <>
          <img
          src={obj.snippet.thumbnails.high.url}
          alt={obj.snippet.title}
        />{" "}
        <p id="title">{obj.snippet.title}</p>
        <p className="views">
          {/* {convertNumber(obj.statistics.viewCount)}  */}views{" "}
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