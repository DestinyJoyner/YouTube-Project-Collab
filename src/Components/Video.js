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
    const moreChannelData = JSON.parse(window.localStorage.getItem(`channel-${relatedVideoData}`))
    setVidData(videoData)
    setRelatedVids(JSON.parse(window.localStorage.getItem(`related-to-video-${id}`)))
    setChannel(moreChannelData)
    
  },[id])

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
          <span>Date added: {vidData.items[0].snippet.publishedAt? convertDate(vidData.items[0].snippet.publishedAt): null}</span>
          <span>{vidData.items[0].statistics.viewCount ? convertNumber(vidData.items[0].statistics.viewCount): null} views</span>
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
          {relatedVids.items.map(obj => {
            if(obj.id.videoId){
              return <ChannelThumbnail
              key={obj.id.videoId}
              obj = {obj}
          />
            }
          }
          )}
        </div>
      </section>

    </div>
  );
}

export default Video;
