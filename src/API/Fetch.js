URL = "https://youtube.googleapis.com/youtube/v3/";

export const fetchData = (resource, searchInput, setData) => {
  const formattedInput = searchInput.replaceAll(" ", "%20");
  const fDetails = "?part=snippet&maxResults=10&q=";
  const apiKey = `&key=${process.env.REACT_APP_API_KEY}`;

  /* conditional for testing */
  const stored = window.localStorage.getItem(searchInput)
  if(stored){
    setData(JSON.parse(stored).items)
  }
  else{
    fetch(URL + resource + fDetails + formattedInput + apiKey)
    .then((res) => res.json())
    .then((res) => {
      window.localStorage.setItem(searchInput, JSON.stringify(res));
      setData(res.items);
    })
    .catch((err) => console.log(err));
  }

  // const formattedInput = searchInput.replaceAll(" ", "%20");
  // const fDetails = "?part=snippet&maxResults=10&q=";
  // const apiKey = `&key=${process.env.REACT_APP_API_KEY}`;
  // fetch(URL + resource + fDetails + formattedInput + apiKey)
  //   .then((res) => res.json())
  //   .then((res) => {
  //     window.localStorage.setItem(searchInput, JSON.stringify(res));
  //     setData(res.items);
  //   })
  //   .catch((err) => console.log(err));
};
