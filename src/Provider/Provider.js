import { useState, createContext } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Modal from "../Components/Modal";
import { fetchViews, videoThumbnailEmpty } from "../Functions/functions";

// test
import { empty} from "../Functions/functions";

// Create Context object to consume data in other components
export const ContextData = createContext();

function Provider({ children }) {
  // declare state to toggle darkMode
  const [darkMode, setDarkMode] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [modal, setModal] = useState(false);
  const [numResults, setNumResults] = useState("9");
  const [order, setOrder] = useState("relevance");
 
//   test for video.js state to be changed from onclick videothumbnail
    const [vidData, setVidData] = useState(empty);
    // related to video state
    const [relatedVids, setRelatedVids] = useState(empty);
    // more from channel state
    const [channel, setChannel] = useState(empty.items);

    // test for favorites
    const [favData, setFavData] = useState(JSON.parse(window.localStorage.getItem(`favorites`))? JSON.parse(window.localStorage.getItem(`favorites`)):[])

  const URL = "https://youtube.googleapis.com/youtube/v3/";

  const fetchData = (
    resource,
    searchInput,
    setData,
    order,
    number
  ) => {
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
            setModal(true)
          } else {
            // store search keyword, order and num in local storage
            window.localStorage.setItem(storageVar, JSON.stringify(res));
            setData(res.items);
            // call fetch for channel info and video info here for each video insearch result and save by id in local storage.
            res.items.forEach(({id,snippet}) => {
                // fetch for channel id info
              fetch( `https://youtube.googleapis.com/youtube/v3/search?part=snippet&$channelId=${snippet.channelId}&maxResults=6&type=video&key=${process.env.REACT_APP_API_KEY}`)
              .then(resp => resp.json())
              .then(respJson => {
                let count = 0;
                const filtered = respJson.items.filter((video) => {
                if (video.id.videoId !== id && count < 5) {
                count++;
                return video;
              }
            })
            window.localStorage.setItem(`channel-${snippet.channelId}`, JSON.stringify(filtered))
              })
              .catch(err => console.log(err) /* setModal(true) */)
              
              // fetch for related to video info
              fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&relatedToVideoId=${id.videoId}&type=video&key=${process.env.REACT_APP_API_KEY}`)
              .then((resp) => resp.json())
              .then((respJson) => window.localStorage.setItem(`related-to-video-${id.videoId}`, JSON.stringify(respJson)))
              .catch((err) => setModal(true));

            //   fetch for video with stats/views 
            fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${id.videoId}&maxResults=1&key=${process.env.REACT_APP_API_KEY}`)
            .then(resp => resp.json())
            .then(respJson => window.localStorage.setItem(`views-${id.videoId}`, JSON.stringify(respJson)))
            })
            
          }
        })
        .catch((err) => {
          setModal(true);
          
        });
    }
  };

  // variable to hold darkMode styles object
  const darkStyles = {
    backgroundColor: "black",
    color: "aqua",
    border: "2px solid green",
  };

  // the prop value of .Provider always takes in an object { {} } and can hold multiple values
  // The components or elements inside of Provider will ALWAYS BE RENDERED IN CHILD COMPONENETS OF PROVIDER, OR IF APP WRAPPED INSIDE OF PROVIDER COMPONENT (inside index.js)
  // **** NEED {children} as a prop to render all child components ****
  return (
    <div style={darkMode ? darkStyles : {}}>
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
          darkStyles,
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
