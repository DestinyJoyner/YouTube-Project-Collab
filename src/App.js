import { Routes, Route } from "react-router-dom";

import Footer from "./Components/Footer"
import Nav from "./Components/Nav";
import './App.css';

function App() {
  
  return (
    <div className="App">
      <Nav />
      
      <Routes>
        <Route path = "/" element = {<>Home</>} />

        <Route path = "/about" element = {<>About</>} />

        <Route path="/search/:keyword" element = {<>Search Result</>}  />

        <Route path="/video:id" element = {<>Video Player</>} />

        <Route path = "*" element = {<>Error</>}/>

      </Routes>
      
      <Footer />
     
    </div>
  );
}

export default App;
