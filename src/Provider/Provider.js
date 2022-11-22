import { useState, createContext } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Modal from "../Components/Modal";

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

  const URL = "https://youtube.googleapis.com/youtube/v3/";

  const fetchData = (resource, searchInput, setData, order, number) => {
    const lowerCase = searchInput.toLowerCase();
    const storageVar = `${lowerCase}-${order}-${number}`;
    // check if search is already in local storage
    const stored = window.localStorage.getItem(storageVar);
    if (stored) {
      setData(JSON.parse(stored));
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
            // filtering out non video results
            // const resFiltered = res.items.filter((el) =>
            //   Object.keys(el.id).includes("videoId")
            // );
            // res.items = resFiltered;
            window.localStorage.setItem(storageVar, JSON.stringify(res.items));
            setData(res.items);
          }
        })
        .catch((err) => {
          console.log(err);
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
