import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import CommentForm from "./CommentForm";
import "./Video.css";

function Video() {
  const { id } = useParams();
  const stored = JSON.parse(window.localStorage.getItem("video " + id));
  const [vidData, setVidData] = useState(stored);

  const opts = {
    height: 400,
    width: 800,
  };

  // related to
  // https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&relatedToVideoId=x74lBu1Bn0g&type=video&key=

  // more from channel
  // https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCBJeMCIeLQos7wacox4hmLQ&maxResults=5&type=video&key=

  useEffect(() => {
    if (!vidData) {
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
  }, [id]);

  return (
    <div>
      <div className="video">
        <YouTube videoId={id} opts={opts} />
      </div>
      <h2>{vidData.items[0].snippet.localized.title}</h2>
      <h4>{vidData.items[0].snippet.channelTitle}</h4>
      <p>{vidData.items[0].snippet.localized.description}</p>

      <p>Date added: {vidData.items[0].snippet.publishedAt}</p>
      <p>{vidData.items[0].statistics.viewCount} views</p>
      <CommentForm videoId={id} />
    </div>
  );
}

export default Video;
