import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import CommentForm from "./CommentForm";
import VideoThumbnail from "./VideoThumbnail";
import { convertDate, convertNumber } from "../Provider/helperFunctions";
import "./Video.css";
import tvImage from "./assets/channel-icon.png";

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
          thumbnails: {
            high: {
              url: "",
            },
          },
          publishedAt: "",
          channelTitle: "",
        },
        statistics: {
          viewCount: "",
        },
        id: {
          kind: "",
          videoId: "",
        },
      },
    ],
  };

  const test = JSON.parse(window.localStorage.getItem(`video tTO3EZj2Hx4`))
  const [vidData, setVidData] = useState(test);

  // related to video state
  const [relatedVids, setRelatedVids] = useState(test);
  // more from channel state
  const [channel, setChannel] = useState(test.items);

  const opts = {
    height: 400,
    width: 650,
  };

  // related to
  // https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&relatedToVideoId=x74lBu1Bn0g&type=video&key=

  // more from channel
  // https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCBJeMCIeLQos7wacox4hmLQ&maxResults=5&type=video&key=

  function moreVidData(fetchParam, idValue, setFunction) {
    const search = `search?part=snippet&maxResults=5&`;
    const type = `type=video&key=`;
    // params 'channelId', or 'relatedToVideoId'
    if (fetchParam === `channelId`) {
      fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&${fetchParam}=${idValue}&maxResults=6&type=video&key=${process.env.REACT_APP_API_KEY}`
      )
        .then((resp) => resp.json())
        .then((respJson) => {
          let count = 0;
          const filtered = respJson.items.filter((video) => {
            if (video.id.videoId !== id && count < 5) {
              count++;
              return video;
            }
          });
          setChannel(filtered);
        })
        .catch((err) => console.log(err));
      } 
      else if (fetchParam === `relatedToVideoId`) {
      fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&${fetchParam}=${idValue}&type=video&key=${process.env.REACT_APP_API_KEY}`
      )
        .then((resp) => resp.json())
        .then((respJson) => setFunction(respJson))
        .catch((err) => console.log(err));
    } 
}

  useEffect(() => {
    if (stored) {
      setVidData(stored);
      const channelId = stored.items[0].snippet.channelId
      // moreVidData(`channelId`, channelId, setChannel)
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

          if(respJson.items[0].id.videoId !== "" ){
            moreVidData(`channelId`, respJson.items[0].snippet.channelId, setChannel)
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

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
          <span>{convertNumber(vidData.items[0].statistics.viewCount)} views</span>
          <span>
            <input 
            type="button" 
            value="Add To Favorites"
            />
          </span>
        </p>
        </div>
        <p className="description">{vidData.items[0].snippet.localized.description}</p>

        {/* <p className="stats">
          <span>Date added: {convertDate(vidData.items[0].snippet.publishedAt)}</span>
          <span>{convertNumber(vidData.items[0].statistics.viewCount)} views</span>
          <span>
            <input type="button" value="Add To Favorites"></input>
          </span>
        </p> */}
      </section>

      <section className="related">
        <h4>More from {vidData.items[0].snippet.channelTitle}:</h4>
        <div className="moreVids">
          {channel && channel.map((video) => (
            <>
              <VideoThumbnail
              key={video.id.videoId}
              video={video}
              videoId={video.id.videoId}
            />
            <VideoThumbnail
              key={video.id.videoId}
              video={video}
              videoId={video.id.videoId}
            />
            <VideoThumbnail
              key={video.id.videoId}
              video={video}
              videoId={video.id.videoId}
            />
            <VideoThumbnail
              key={video.id.videoId}
              video={video}
              videoId={video.id.videoId}
            />
            <VideoThumbnail
              key={video.id.videoId}
              video={video}
              videoId={video.id.videoId}
            />
            </>
          ))}

        </div>
      </section>

      <section className="related">
        <h4>You May Also Like:</h4>
        <div className="moreVids">
          {relatedVids.items.map((video) => (
            <>
            <VideoThumbnail
            key={video.id.videoId}
            video={video}
            videoId={video.id.videoId}
          />
          <VideoThumbnail
            key={video.id.videoId}
            video={video}
            videoId={video.id.videoId}
          />
          <VideoThumbnail
            key={video.id.videoId}
            video={video}
            videoId={video.id.videoId}
          />
          <VideoThumbnail
            key={video.id.videoId}
            video={video}
            videoId={video.id.videoId}
          />
          <VideoThumbnail
            key={video.id.videoId}
            video={video}
            videoId={video.id.videoId}
          />
          </>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Video;
