import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ContextData } from "../Provider/Provider.js";
import { convertNumber, convertDate, videoThumbnailEmpty, empty, testViews } from "../Functions/functions.js"
import "./VideoThumbnail.css";

function VideoThumbnail({videoId}) {
  const { recent, setRecent, setModal } = useContext(ContextData)
  const stored = window.localStorage.getItem(`views-${videoId}`) 
  // const [thisVideo, setThisVideo] = useState(JSON.parse(stored))
  const [thisVideo, setThisVideo] = useState([])

  // function on click to add video to recently viewed list
  function addToRecents(e) {
   const vidTitle = JSON.parse(window.localStorage.getItem(`views-${e.target.name}`))[0].snippet.localized.title
  
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

// useEffect(() => {
  
//   setThisVideo(JSON.parse(stored))
//   console.log(`use effect`, thisVideo)
//   // const stored = window.localStorage.getItem(`views-${videoId}`) 
//   // if(stored){
//   //   setThisVideo(JSON.parse(stored))
//   // }
//   },[videoId])

useEffect(() => {
  testViews(videoId)
  .then(respJson => {
    setThisVideo(respJson.items)
    window.localStorage.setItem(`views-${videoId}`, JSON.stringify(respJson.items))
  })
  .catch(err => setModal(true))
}, [videoId])

  return (
    <div className="videoThumbnail">
        {  thisVideo.length > 0 &&
          thisVideo.map(obj => 
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
          {obj.snippet.title.length > 80?<span>{obj.snippet.title.slice(0,80)}<span id="dots">...</span></span>:obj.snippet.title }</p>
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

