import { useState, useEffect, useContext } from "react";
import { ContextData } from "../Provider/Provider";
import VideoThumbnail from "./VideoThumbnail";
import "./Home.css";

function Home() {

  const [desVids, setDesVids] = useState([]);
  const [dansVids, setDansVids] = useState([]);
  const [dansTheme, setDansTheme] = useState("");
  const [desTheme, setDesTheme] = useState("");

  const { fetchData } = useContext(ContextData);

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
    return arr[Math.floor(Math.random() * arr.length)];
  }

  useEffect(() => {
    // using the variables to account setState delay
    const danVal = randomize(dansPicks);
    const desVal = randomize(desPicks);
    setDansTheme(danVal);
    setDesTheme(desVal);

    fetchData(`search`, danVal, setDansVids, "relevance", 2);

    // fetchData(`search`, desVal, setDesVids, "relevance", 4);
  }, []);

  return (
    <section className="featVids">
      <div className="dan">
        {/* <p>
          Dan's Search Suggestion:{" "}
          <span className="home-span">{dansTheme}</span>
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
      </div> */}

      {/* <div className="destiny">
        <p>
          Destiny's Search Suggestion:{" "}
          <span className="home-span">{desTheme}</span>
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
          })} */}
      </div>
    </section>
  );
}

export default Home;
