import { useState } from "react";

import RouteComponent from "./Components/RouteComponent";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import Modal from "./Components/Modal";

import "./App.css";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <Nav />

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
