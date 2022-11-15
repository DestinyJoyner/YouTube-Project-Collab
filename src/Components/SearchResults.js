import { useEffect } from "react";

export default function SearchResults({ searchResult }) {
  useEffect(() => {
    console.log("useEffect");
  }, [searchResult]);
  return (
    <div>
      Search Results:
      {searchResult &&
        searchResult.map((e) => {
          return (
            <div key={e.id.videoId}>
              <p>{e.snippet.title}</p>
              <img src={e.snippet.thumbnails.default.url} alt={e.snippet.title}></img>
            </div>
          );
        })}
    </div>
  );
}
