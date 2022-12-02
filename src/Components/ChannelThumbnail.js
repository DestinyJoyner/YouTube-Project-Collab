import { useContext } from "react";

import { ContextData } from "../Provider/Provider";
import { Link, useNavigate } from "react-router-dom";
// import { convertDate, convertNumber } from '../Functions/functions';

function ChannelThumbnail({ obj }) {
  const { recent, setRecent } = useContext(ContextData);

  const navigate = useNavigate();
  // function on click to add video to recently viewed list
  // function addToRecents(e) {
  //   const vidTitle = JSON.parse(
  //     window.localStorage.getItem(`views-${e.target.id}`)
  //   )[0].snippet.localized.title;

  //   const newRecent = {
  //     id: e.target.id,
  //     title: vidTitle,
  //   };

  //   const duplicate = recent.filter(({ id }) => id === e.target.id);
  //   if (!Object.keys(duplicate).length) {
  //     window.localStorage.setItem(
  //       `recents`,
  //       JSON.stringify([newRecent, ...recent])
  //     );
  //     setRecent([newRecent, ...recent]);
  //   }
  //   //  navigate(`/video/${e.target.id}`);
  //   // navigate("/");
  //     // e.preventDefault()
  //   // console.log(e);
  //   // navigate(`/video/${e.target.id}`);
  // }
  return (
    <div className="videoThumbnail" >
    <Link to = {`/video/${obj.id.videoId}`}>
      {obj.id.videoId && (
        <>
          <img
            src={obj.snippet.thumbnails.high.url}
            alt={obj.snippet.title}
            id={obj.id.videoId}
            
          />{" "}
          <p className="titleThumb" id={obj.id.videoId}>
            {obj.snippet.title}
          </p>
        </>
      )}
      </Link>
     </div>
  );
}

export default ChannelThumbnail;

//  <Link
//  to={`/video/${obj.id.videoId}`}
//  key = {obj.id.videoId}
//  name = {obj.id.videoId}
//  onClick = {(event) => {
//   console.log(event)
//   console.log(`clicked`)
//   addToRecents(event)}}>
//  </Link>
