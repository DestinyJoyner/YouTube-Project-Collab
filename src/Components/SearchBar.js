import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { ContextData } from "../Provider/Provider";
import searchIcon from "./assets/Search-icon.png";
import "./SearchBar.css";

export default function SearchBar() {
  const {
    fetchData,
    searchInput,
    setSearchInput,
    setSearchResult,
    order,
    setOrder,
    numResults,
    setNumResults,
  } = useContext(ContextData);

  const navigate = useNavigate();

  const orderVal = ["relevance", "date", "viewCount"];
  const orderNames = ["Relevance", "Most Recent", "Most Viewed"];
  const numArr = ["9", "18", "27", "36", "45"];

  return (
    <div className="search-section">
      <div className="dropdowns">
        <section className="order-drop">
          <Dropdown
            value={"order"}
            title={"Sort By: "}
            optionValue={orderVal}
            optionName={orderNames}
            stateVar={order}
            setFunction={setOrder}
          />
        </section>

        <section className="num-drop">
          <Dropdown
            className="num-drop"
            value={"maxResults"}
            title={"Number of Results: "}
            optionValue={numArr}
            optionName={numArr}
            stateVar={numResults}
            setFunction={setNumResults}
          />
        </section>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchResult([]);
          fetchData("search", searchInput, setSearchResult, order, numResults);
          navigate(`/search/${searchInput}/${order}/${numResults}`);
          setSearchInput("");
          setNumResults("9");
        }}
      >
        <input
          className="textbox"
          type="text"
          placeholder="Enter Keyword(s) Here..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <input
          type="image"
          alt="search"
          src={searchIcon}
          className="button"
        ></input>
      </form>
    </div>
  );
}
