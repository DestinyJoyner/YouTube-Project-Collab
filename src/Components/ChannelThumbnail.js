import { useContext } from 'react';
import { ContextData } from '../Provider/Provider';
import { Link } from 'react-router-dom';
import { convertDate, convertNumber } from '../Functions/functions';

function ChannelThumbnail({obj}) {
  const {recent, setRecent} = useContext(ContextData)

  // function on click to add video to recently viewed list
  function addToRecents(e) {
    const vidTitle = JSON.parse(window.localStorage.getItem(`views-${e.target.name}`))[0].snippet.localized.title
    console.log(vidTitle)
   
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
    return (
        <div className="videoThumbnail">
          { obj.id.videoId &&
             <Link 
             to={`/video/${obj.id.videoId}`}
             key = {obj.id.videoId}
             name = {obj.id.videoId}
             onClick = {(event) => addToRecents(event)}>
                 <img
                 src={obj.snippet.thumbnails.high.url}
                 alt={obj.snippet.title}
                 name = {obj.id.videoId}
               />{" "}
               <p 
               id="title"
               name = {obj.id.videoId}>
                 {obj.snippet.title}</p>
               <p 
               className="views"
               name = {obj.id.videoId}>
                {/* {obj.statistics.viewCount ? convertNumber(obj.statistics.viewCount) : null}  */}views{" "}
                 <span>date added: {convertDate(obj.snippet.publishedAt)}</span>
               </p>
               
             </Link>
          }
     
    </div>
    );
}

export default ChannelThumbnail;