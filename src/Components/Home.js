import { useState, useEffect, useContext } from "react";
import { ContextData } from "../Provider/Provider";
import VideoThumbnail from "./VideoThumbnail";
import "./Home.css";

function Home() {
  // hardcoded for testing
  const desStored = JSON.parse(window.localStorage.getItem(`the office-relevance-4`))
  const danStored = JSON.parse(window.localStorage.getItem(`qlimax-relevance-4`))

  const [desVids, setDesVids] = useState(desStored);
  const [dansVids, setDansVids] = useState(danStored);
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

/*   useEffect(() => {
    const danVal = randomize(dansPicks);
    const desVal = randomize(desPicks);
    setDansTheme(danVal);
    setDesTheme(desVal);

    // check if in local storage
    const danStored = window.localStorage.getItem(`${danVal.toLowerCase()}-relevance-4`)
    const desStored = JSON.parse(window.localStorage.getItem(`the office relevance 4`))
    
    if(danStored){
      setDansVids(JSON.parse(danStored))
    }
    // if(desStored){
    //   setDesVids(desStored)
    // }
    else{
      // fetchData(`search`, danVal, setDansVids, "relevance", 4);
      // fetchData(`search`, desVal, setDesVids, "relevance", 4);
      console.log(`not in storage`)
    }
    // using the variables to account setState delay
    // const danVal = randomize(dansPicks);
    // const desVal = randomize(desPicks);
    // setDansTheme(danVal);
    // setDesTheme(desVal);

    // fetchData(`search`, danVal, setDansVids, "relevance", 4);

    // fetchData(`search`, desVal, setDesVids, "relevance", 4);
  }, []); */

  return (
    <section className="featVids">
      <div className="dan">
        <p>
          Dan's Search Suggestion:{" "}
          <span className="home-span">{dansTheme}</span>
        </p>
        {dansVids &&
          dansVids.items.map(({id}) => 
                <VideoThumbnail
                  key={id.videoId}
                  videoId={id.videoId}
                />
          )}
      </div>

      <div className="destiny">
        <p>
          Destiny's Search Suggestion:{" "}
          <span className="home-span">{desTheme}</span>
        </p>
        {desVids &&
          desVids.items.map(({id}) => 
                <VideoThumbnail
                  key={id.videoId}
                  videoId={id.videoId}
                />
          )}
      </div>
    </section>
  );
}

export default Home;
