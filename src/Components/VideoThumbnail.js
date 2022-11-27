import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ContextData } from "../Provider/Provider.js";
import { convertNumber, convertDate, videoThumbnailEmpty } from "../Functions/functions.js"
import "./VideoThumbnail.css";

function VideoThumbnail({videoId}) {
  const {vidData, setVidData, relatedVids, setRelatedVids, channel, setChannel, recent, setRecent} = useContext(ContextData)
  const [thisVideo, setThisVideo] = useState(videoThumbnailEmpty)

  // function on click to add video to recently viewed list
  function addToRecents(e) {
  
    const vidTitle = JSON.parse(window.localStorage.getItem(`views-${e.target.name}`)).items[0].snippet.localized.title
    
    const newRecent = {
      id: e.target.name,
      title: vidTitle, 
    }
    
    const duplicate = recent.filter(({id}) => id === e.target.name)
    console.log(`filter`, duplicate)
    if(!Object.keys(duplicate).length){
      window.localStorage.setItem(`recents`, JSON.stringify([newRecent, ...recent]))
      setRecent([newRecent, ...recent])
    }
    
    
  }
useEffect(() => {
  const stored = JSON.parse(window.localStorage.getItem(`views-${videoId}`)) 
  setThisVideo(stored)
  
  },[videoId])

  return (
    <div 
    className="videoThumbnail"
    >
      {/* <Link 
      to={`/video/${videoId}`}> */}
        {
          thisVideo.items.map(obj => 
            <Link 
            to={`/video/${videoId}`}
            key= {videoId}
            onClick = {(event) => addToRecents(event)}
            name = {videoId}>
          <img
          src={obj.snippet.thumbnails.high.url}
          alt={obj.snippet.title}
          name = {videoId}
        />{" "}
        <p 
        id="title"
        name = {videoId}>
          {obj.snippet.title}</p>
        <p 
        className="views"
        name = {videoId}>
          <span>{obj.statistics.viewCount ? convertNumber(obj.statistics.viewCount) : null} views{" "}</span>
          <span>date added: {convertDate(obj.snippet.publishedAt)}</span>
        </p>
        </Link>
         
            
          )
        }
      {/* </Link> */}
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