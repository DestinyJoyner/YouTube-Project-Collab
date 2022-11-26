import React from "react";
import { useState, useEffect, useContext } from "react";
import { ContextData } from "../Provider/Provider";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import VideoThumbnail from "./VideoThumbnail";
import ChannelThumbnail from "../Provider/ChannelThumbnail";
import CommentForm from "./CommentForm";
import { convertDate, convertNumber, empty } from "../Provider/helperFunctions";
import "./Video.css";
import tvImage from "./assets/channel-icon.png";

function Video() {
  const { id } = useParams();
  const {favorites, setFavorites, vidData, setVidData, relatedVids, setRelatedVids, channel, setChannel } = useContext(ContextData)

  // const stored = JSON.parse(window.localStorage.getItem("video " + id));

  // const empty = {
  //   items: [
  //     {
  //       snippet: {
  //         localized: {
  //           title: "",
  //           description: "",
  //         },
  //         thumbnails: {
  //           high: {
  //             url: "",
  //           },
  //         },
  //         publishedAt: "",
  //         channelTitle: "",
  //       },
  //       statistics: {
  //         viewCount: "",
  //       },
  //       id: {
  //         kind: "",
  //         videoId: "",
  //       },
  //     },
  //   ],
  // };

  // const test = JSON.parse(window.localStorage.getItem(`video tTO3EZj2Hx4`))
  const stored = JSON.parse(window.localStorage.getItem("video " + id));
  // const [vidData, setVidData] = useState(empty);

  // // related to video state
  // const [relatedVids, setRelatedVids] = useState(empty);
  // // more from channel state
  // const [channel, setChannel] = useState(empty);
  // clicked state for add to favorites button
  const [clicked, setClicked] = useState(false)

  function clickedFavorites() {
    // setClicked(!clicked)
    const favObj = {
      title: '',
      id: '',
      chanId: '',
      chanName: '',
      image : '',
    }
    vidData.items.forEach(({id, snippet}) => {
      favObj.title = snippet.title
      favObj.vidId = id
      favObj.image = snippet.thumbnails.high.url
      favObj.chanName = snippet.channelTitle
      favObj.chanId = snippet.channelId

    })
    const inFavorites = favorites.find(({vidId}) => id === vidId)
    const filterFavorites = favorites.filter(({vidId}) => vidId !== id)
     inFavorites ? setFavorites(filterFavorites) : setFavorites([...favorites, favObj])
    
    // setFavorites([...favorites, favObj])
    window.localStorage.setItem('favorites', JSON.stringify(favorites))
  }

  const opts = {
    height: 400,
    width: 650,
  };

  // related to
  // https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&relatedToVideoId=x74lBu1Bn0g&type=video&key=

  // more from channel
  // https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCBJeMCIeLQos7wacox4hmLQ&maxResults=5&type=video&key=

//   function moreVidData(fetchParam, idValue, setFunction) {
//     const search = `search?part=snippet&maxResults=5&`;
//     const type = `type=video&key=`;
//     // params 'channelId', or 'relatedToVideoId'
//     if (fetchParam === `channelId`) {
//       fetch(
//         `https://youtube.googleapis.com/youtube/v3/search?part=snippet&${fetchParam}=${idValue}&maxResults=6&type=video&key=${process.env.REACT_APP_API_KEY}`
//       )
//         .then((resp) => resp.json())
//         .then((respJson) => {
//           let count = 0;
//           const filtered = respJson.items.filter((video) => {
//             if (video.id.videoId !== id && count < 5) {
//               count++;
//               return video;
//             }
//           });
//           setChannel(filtered);
//         })
//         .catch((err) => console.log(err));
//       } 
//       else if (fetchParam === `relatedToVideoId`) {
//       fetch(
//         `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&${fetchParam}=${idValue}&type=video&key=${process.env.REACT_APP_API_KEY}`
//       )
//         .then((resp) => resp.json())
//         .then((respJson) => setFunction(respJson))
//         .catch((err) => console.log(err));
//     } 
// }

  // useEffect(() => {
  //   if (stored) {
  //     setVidData(stored);
  //     const channelId = stored.items[0].snippet.channelId
  //     // moreVidData(`channelId`, channelId, setChannel)
  //   }
  //   if (!stored) {
  //     fetch(
  //       `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${id}&maxResults=1&key=${process.env.REACT_APP_API_KEY}`
  //     )
  //       .then((resp) => resp.json())
  //       .then((respJson) => {
          
  //         const videoFetchData = `video ${id}`;
  //         window.localStorage.setItem(videoFetchData, JSON.stringify(respJson));
  //         setVidData(respJson);

  //         if(respJson.items[0].id.videoId !== "" ){
  //           moreVidData(`channelId`, respJson.items[0].snippet.channelId, setChannel)
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [id]);

  useEffect(()=> {
    const videoData = JSON.parse(window.localStorage.getItem(`views-${id}`))
    const relatedVideoData = videoData.items[0].snippet.channelId
    // console.log(relatedVideoData)
    const moreChannelData = JSON.parse(window.localStorage.getItem(`channel-${relatedVideoData}`))
    setVidData(videoData)
    setRelatedVids(JSON.parse(window.localStorage.getItem(`related-to-video-${id}`)))
    setChannel(moreChannelData)
    // if(channel[0].id.videoId !== ""){
    //   console.log(channel[0].id.videoId)
    //   console.log(moreChannelData)
    //   // setChannel(moreChannelData)
    // }

  },[id])
// console.log(channel)
  return (
    <div className="videoPage">
      
      <div className="video">
        <YouTube videoId={id} opts={opts} />
      </div>
      
      <CommentForm videoId={id} />

      <section className="videoInfo">
        <h2>{vidData.items[0].snippet.localized.title}</h2>

        <h4>
          <img src={tvImage} alt="tv-icon" />
          <span>{vidData.items[0].snippet.channelTitle}</span>
        </h4>

        <div >
        <p className="stats">
          <span>Date added: {convertDate(vidData.items[0].snippet.publishedAt)}</span>
          {/* <span>{convertNumber(vidData.items[0].statistics.viewCount)} views</span> */}
          <span>
            <input
            style={clicked ? {backgroundColor: "#f40402", color: 'white', border: '2px solid #e8e5e5 '} : null} 
            type="button" 
            value= 'Add To Favorites' 
            /* {!clicked ? 'Add to Favorites' : 'Remove from Favorites'}  */
            /* onClick={() => clickedFavorites()} */
            />
          </span>
        </p>
        </div>
        <p className="description">{vidData.items[0].snippet.localized.description}</p>

        <p className="stats">
          <span>Date added: {/* {convertDate(vidData.items[0].snippet.publishedAt)} */}</span>
          <span>{/* {convertNumber(vidData.items[0].statistics.viewCount)} */} views</span>
          <span>
            <input type="button" value="Add To Favorites"></input>
          </span>
        </p>
      </section>

      <section className="related">
        <h4>More from {vidData.items[0].snippet.channelTitle}:</h4>
        <div className="moreVids">
          {
            channel.length > 1 && channel.map(obj => 
              <ChannelThumbnail 
              key = {obj.id.videoId}
              obj = {obj}/>
            )
          }
        </div>
      </section>

      <section className="related">
        <h4>You May Also Like:</h4>
        <div className="moreVids">
          {relatedVids.items.length > 1 && relatedVids.items.map(obj => 
            <ChannelThumbnail
            key={obj.id.videoId}
            obj = {obj}
          />
          )}
        </div>
      </section>

    </div>
  );
}

export default Video;
