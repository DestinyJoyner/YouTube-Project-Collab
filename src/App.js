import { useState } from "react";

import RouteComponent from "./Components/RouteComponent";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";

import "./App.css";

function App() {
  // const [searchInput, setSearchInput] = useState("");
  // const [searchResult, setSearchResult] = useState([]);

  return (
    <div className="App">
      <Nav />

      <RouteComponent
        // searchInput={searchInput}
        // setSearchInput={setSearchInput}
        // setSearchResult={setSearchResult}
        // searchResult={searchResult}
      />

      <Footer />
    </div>
  );
}

export default App;
