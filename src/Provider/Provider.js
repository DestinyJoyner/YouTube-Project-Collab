import { useState, createContext, useContext } from "react";
import axios from "axios";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Modal from "../Components/Modal";
import { viewsFetch } from "../Functions/functions";

// Create Context object to consume data in other components
export const ContextData = createContext();

// function for using contextProvider in other components
export function useContextProvider() {
  return useContext(ContextData);
}

// API URL AND KEY in .env
const URL = process.env.REACT_APP_URL;
const KEY = process.env.REACT_APP_API_KEY;

function Provider({ children }) {
  const favorites = JSON.parse(window.localStorage.getItem(`favorites`));
  const recents = JSON.parse(window.localStorage.getItem(`recents`));
  // declare state to toggle darkMode
  const darkStored = JSON.parse(window.localStorage.getItem(`darkMode`));
  const [darkMode, setDarkMode] = useState(darkStored ? true : false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [modal, setModal] = useState(false);
  const [numResults, setNumResults] = useState("9");
  const [order, setOrder] = useState("relevance");

  //test for video.js state to be changed from onclick videothumbnail
  const [vidData, setVidData] = useState([]);
  // related to video state
  const [relatedVids, setRelatedVids] = useState({});
  // more from channel state
  const [channel, setChannel] = useState([]);
  // test for favorites
  const [favData, setFavData] = useState(favorites ? favorites : []);
  // state for recently viewed videos
  const [recent, setRecent] = useState(recents ? recents : []);
  // declare state for storing comments
  const [comments, setComments] = useState([]);

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
      const apiKey = `&key=${KEY}`;

      axios
        .get(URL + resource + fDetails + formattedInput + type + apiKey)
        .then(({ data }) => {
          // if we receive a res error -> show modal
          if (data.error) {
            setModal(true);
          } else {
            // store search keyword, order and num in local storage
            window.localStorage.setItem(storageVar, JSON.stringify(data.items));
            data.items.forEach(({ id }) => {
              //   fetch for video with stats/views
              viewsFetch(id.videoId, setModal);
            });
            setData(data.items);
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
          comments,
          setComments,
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
