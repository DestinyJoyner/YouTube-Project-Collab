import { useState, createContext } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Modal from "../Components/Modal";
import { videoThumbnailEmpty, empty, viewsFetch } from "../Functions/functions";

// Create Context object to consume data in other components
export const ContextData = createContext();

function Provider({ children }) {
  // declare state to toggle darkMode
  const [darkMode, setDarkMode] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(empty.items);
  const [modal, setModal] = useState(false);
  const [numResults, setNumResults] = useState("9");
  const [order, setOrder] = useState("relevance");

  //test for video.js state to be changed from onclick videothumbnail
  const [vidData, setVidData] = useState(empty);
  // related to video state
  const [relatedVids, setRelatedVids] = useState(empty);
  // more from channel state
  const [channel, setChannel] = useState(empty.items);
  // test for favorites
  const [favData, setFavData] = useState(
    JSON.parse(window.localStorage.getItem(`favorites`))
      ? JSON.parse(window.localStorage.getItem(`favorites`))
      : []
  );
  // state for recently viewed videos
  const [recent, setRecent] = useState(
    JSON.parse(window.localStorage.getItem(`recents`))
      ? JSON.parse(window.localStorage.getItem(`recents`))
      : []
  );
  const URL = "https://youtube.googleapis.com/youtube/v3/";

  const fetchData = (resource, searchInput, setData, order, number) => {
    const lowerCase = searchInput.toLowerCase();
    const storageVar = `${lowerCase}-${order}-${number}`;
    // check if search is already in local storage
    const stored = window.localStorage.getItem(storageVar);
    if (stored) {
      setData(JSON.parse(stored).items);
    } else {
      const formattedInput = lowerCase.replaceAll(" ", "%20");
      const fDetails = `?part=snippet&maxResults=${number}&order=${order}&q=`;
      const type = `&type=video`;
      const apiKey = `&key=${process.env.REACT_APP_API_KEY}`;
      fetch(URL + resource + fDetails + formattedInput + type + apiKey)
        .then((res) => res.json())
        .then((res) => {
          // if we receive a res error -> show modal
          if (res.error) {
            setModal(true);
          } else {
            // store search keyword, order and num in local storage
            window.localStorage.setItem(storageVar, JSON.stringify(res.items));
            res.items.forEach(({id}) => {
              //   fetch for video with stats/views
              viewsFetch(id.videoId, setModal)
          });
            setData(res.items);
            // fetch for views info for each video in fetch return
          //   res.items.forEach(({id}) => {
          //     //   fetch for video with stats/views
          //     viewsFetch(id.videoId, setModal)
          // });
          }
        })
        .catch((err) => setModal(true));
    }
  };
  // the prop value of .Provider always takes in an object { {} } and can hold multiple values
  // The components or elements inside of Provider will ALWAYS BE RENDERED IN CHILD COMPONENETS OF PROVIDER, OR IF APP WRAPPED INSIDE OF PROVIDER COMPONENT (inside index.js)
  // **** NEED {children} as a prop to render all child components ****
  return (
    <div className={darkMode ? "darkMode" : null}>
      <ContextData.Provider
        value={{
          fetchData,
          URL,
          darkMode,
          setDarkMode,
          searchInput,
          setSearchInput,
          searchResult,
          setSearchResult,
          modal,
          setModal,
          order,
          setOrder,
          numResults,
          setNumResults,
          vidData,
          setVidData,
          relatedVids,
          setRelatedVids,
          channel,
          setChannel,
          favData,
          setFavData,
          recent,
          setRecent,
        }}
      >
        <Nav />
        <Footer />
        {modal && <Modal />}

        {children}
      </ContextData.Provider>
    </div>
  );
}

export default Provider;
