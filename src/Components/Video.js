import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { URL } from "../API/Fetch";
import CommentForm from "./CommentForm";
import VideoThumbnail from "./VideoThumbnail";
import "./Video.css";
import tvImage from './assets/channel-icon.png'

function Video() {
  const { id } = useParams();

  const stored = JSON.parse(window.localStorage.getItem("video " + id));

  const empty = {
    items: [
      {
        snippet: {
          localized: {
            title: "",
            description: "",
          },
          publishedAt: "",
          channelTitle: "",
        },
        statistics: {
          viewCount: "",
        },
      },
    ],
  };

  const emptyArr = [
    {
      snippet: {
        localized: {
          title: "",
          description: "",
        },
        publishedAt: "",
        channelTitle: "",
      },
      statistics: {
        viewCount: "",
      },
    },
  ]
  const [vidData, setVidData] = useState(empty);

  // related to video state
  const [relatedVids, setRelatedVids] = useState(emptyArr)
  // more from channel state
  const [channel, setChannel] = useState(emptyArr)

  const opts = {
    height: 400,
    width: 800,
  };

  // convert string functions from videoThumbnail, can add to helperfunction and import but fo now:
  function convertNumber(num) {
    return num
      .split(``)
      .reverse()
      .join(``)
      .match(/.{1,3}/g)
      .join(`,`)
      .split(``)
      .reverse()
      .join(``);
  }

  function convertDate(str) {
    let date = str.slice(2, 10).split("-");
    date.push(date[0]);
    date.shift();
    return date.join("/");
  }

  // related to
  // https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&relatedToVideoId=x74lBu1Bn0g&type=video&key=

  // more from channel
  // https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCBJeMCIeLQos7wacox4hmLQ&maxResults=5&type=video&key=
  
  function moreVidData(fetchParam, id, setFunction ) {
    const search = `search?part=snippet&maxResults=5&`
    const type = `type=video&key=`
    // params 'channelId', or 'relatedToVideoId'
    if (fetchParam === `channelId`){
      fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&${fetchParam}=${id}&maxResults=5&type=video&key=${process.env.REACT_APP_API_KEY}`)
      .then(resp => resp.json())
      .then(respJson => setFunction(respJson.items))
      .catch(err => console.log(err))
    }
    else if(fetchParam === `relatedToVideoId`){
      fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&${fetchParam}=${id}&type=video&key=${process.env.REACT_APP_API_KEY}`)
      .then(resp => resp.json())
      .then(respJson => setFunction(respJson.items))
      .catch(err => console.log(err))
    }
    
  }
 

  useEffect(() => {
    if (stored) {
      setVidData(stored);
    }
    if (!stored) {
      fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${id}&maxResults=1&key=${process.env.REACT_APP_API_KEY}`
      )
        .then((resp) => resp.json())
        .then((respJson) => {
          const videoFetchData = `video ${id}`;
          window.localStorage.setItem(videoFetchData, JSON.stringify(respJson));
          setVidData(respJson);
        })
        .catch((err) => console.log(err));
    }
    // additional fetch calls for related to video and more from channel 
    moreVidData(`relatedToVideoId`, id, setRelatedVids)
    // moreVidData(`channelId`, id, setChannel)
  }, [id]);

  return (
    <div>
      <div className="video">
        <YouTube videoId={id} opts={opts} />
      </div>
     
      <section className="videoInfo">
        <h2>{vidData.items[0].snippet.localized.title}</h2>
        
        <h4>
          <img src ={tvImage} alt= 'tv-icon'/>
        
        <span>{vidData.items[0].snippet.channelTitle}</span></h4>
        
        <p className="description">{vidData.items[0].snippet.localized.description}</p>
        
        <p className="stats">
          <span>Date added: {/* {convertDate(vidData.items[0].snippet.publishedAt)} */}</span>
          <span>{/* {convertNumber(vidData.items[0].statistics.viewCount)}  */}views</span>
          <span>
            <input type ="button" value = "Add To Favorites"></input>
          </span>
        </p>
    
      </section>
{/*       
      <section className="fromChannel">
        <h4>More from this Channel:</h4>
        <div className="moreVids">
          { channel.map(video => 
            <VideoThumbnail
              key={video.id.videoId}
              video={video}
              videoId={video.id.videoId}
            />)
          }
        </div>
      </section> */}

      <section className="related">
        <h4>You May Also Like:</h4>
        <div className="moreVids">
      {/*   {   relatedVids.map(video => 
            <VideoThumbnail
              key={video.id.videoId}
              video={video}
              videoId={video.id.videoId}
            />)
          } */}
        </div>
      </section>
      
      
      <CommentForm videoId={id} />
    </div>
  );
}

export default Video;
