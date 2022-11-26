import { Routes, Route, Navigate } from "react-router-dom";
import EasterEgg from "../Easter-Egg/EasterEgg";
import Favorites from "./Favorites";
import Home from "./Home";
import ModalTrigger from "./ModalTrigger";
import SearchResults from "./SearchResults";
import Video from "./Video";

function RouteComponent() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="about" element={<>About</>} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="overkill" element={<EasterEgg />} />

        <Route path="search">
          <Route index element={<Navigate to="/" />} />
          <Route
            path=":keyword"
            element={<SearchResults defaultOrder={true} defaultNum={true} />}
          />
          <Route
            path=":keyword/:order"
            element={<SearchResults defaultNum={true} />}
          />
          <Route path=":keyword/:order/:num" element={<SearchResults />} />
        </Route>

        <Route path="video">
          <Route index element={<Navigate to="/" />} />
          <Route path=":id" element={<Video />} />
        </Route>
        <Route path="*" element={<ModalTrigger isTrue={true} />} />
      </Route>
    </Routes>
  );
}

export default RouteComponent;
