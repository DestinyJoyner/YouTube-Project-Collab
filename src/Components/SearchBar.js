import { useNavigate } from "react-router-dom";

import { fetchData } from "../API/Fetch";
import "./SearchBar.css"

export default function SearchBar({
  searchInput,
  setSearchInput,
  setSearchResult,
  setIsOpen
}) {
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchResult([]);
        fetchData("search", searchInput, setSearchResult, setIsOpen, 9)
        navigate(`/search/${searchInput}`);
        setSearchInput("");
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
      <input type="submit" value="Search" />
    </form>
  );
}
