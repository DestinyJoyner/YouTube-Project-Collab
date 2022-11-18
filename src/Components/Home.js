import React from "react";
import { useState, useEffect } from "react";
import { fetchData } from "../API/Fetch";
import VideoThumbnail from "./VideoThumbnail";
import "./Home.css";

function Home({ setIsOpen }) {
  const [desVids, setDesVids] = useState([]);
  const [dansVids, setDansVids] = useState([]);
  const [dansTheme, setDansTheme] = useState("");
  const [desTheme, setDesTheme] = useState("");

  const dansPicks = [
    "Seria A",
    "Qlimax",
    // "Life Hacks",
    // "React Coding",
    // "Funny Cat Videos",
    // "Ted Lasso",
  ];
  const desPicks = [
    // "Asian Cuisine Recipes",
    // "Egypt Pyramids",
    "How to Adult",
    // "Resident Evil",
    "The Office",
    // "Hats",
  ];

  function randomize(arr) {
    const length = arr.length;
    const index = Math.floor(Math.random() * length);
    return arr[index];
  }

  useEffect(() => {
    const danVal = randomize(dansPicks);
    const desVal = randomize(desPicks);
    setDansTheme(danVal);
    setDesTheme(desVal);
    const dansValue = fetchData(`search`, danVal, setDansVids, setIsOpen, "relevance", 4);

    const desValue = fetchData(`search`, desVal, setDesVids, setIsOpen, "relevance", 4);
  }, []);
  return (
    <section className="featVids">
      <div className="dan">
        <p>
          Dan's Search Suggestion: <span className="home-span">{dansTheme}</span>
        </p>
        {dansVids &&
          dansVids.map((video) => {
            return (
              <VideoThumbnail
                key={video.id.videoId}
                video={video}
                videoId={video.id.videoId}
              />
            );
          })}
      </div>

      <div className="destiny">
        <p>
          Destiny's Search Suggestion: <span className="home-span">{desTheme}</span>
        </p>
        {desVids &&
          desVids.map((video) => {
            return (
              <VideoThumbnail
                key={video.id.videoId}
                video={video}
                videoId={video.id.videoId}
              />
            );
          })}
      </div>
    </section>
  );
}

export default Home;
