import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ContextData } from "../Provider/Provider.js";
import { convertNumber, convertDate, videoThumbnailEmpty, empty } from "../Functions/functions.js"
import "./VideoThumbnail.css";

function VideoThumbnail({videoId}) {
  const { recent, setRecent } = useContext(ContextData)
  const [thisVideo, setThisVideo] = useState(empty)

  // function on click to add video to recently viewed list
  function addToRecents(e) {
   const vidTitle = JSON.parse(window.localStorage.getItem(`views-${e.target.name}`)).items[0].snippet.localized.title
  
   const newRecent = {
      id: e.target.name,
      title: vidTitle, 
    }
    
    const duplicate = recent.filter(({id}) => id === e.target.name)
    if(!Object.keys(duplicate).length){
      window.localStorage.setItem(`recents`, JSON.stringify([newRecent, ...recent]))
      setRecent([newRecent, ...recent])
    }
  }

useEffect(() => {
  const stored = window.localStorage.getItem(`views-${videoId}`) 
  if(stored){
    setThisVideo(JSON.parse(stored))
  }
  },[videoId])

  return (
    <div className="videoThumbnail">
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

    </div>
  )
}

export default VideoThumbnail;

