import { useState } from "react";

import RouteComponent from "./Components/RouteComponent";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import Modal from "./Components/Modal";

import "./App.css";
import Provider from "./Provider/Provider";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      {/* <Nav /> */}
      <Provider>
      <Nav 
      searchInput ={searchInput} 
      setSearchInput ={setSearchInput}
      searchResult ={searchResult} 
      setSearchResult = {setSearchResult}/>
      </Provider>
  

      <RouteComponent
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchResult={setSearchResult}
        searchResult={searchResult}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />


      
      {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
      
      <Footer />
    </div>
  );
}

export default App;
