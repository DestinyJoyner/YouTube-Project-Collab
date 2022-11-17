URL = "https://youtube.googleapis.com/youtube/v3/";

export const fetchData = (resource, searchInput, setData, setModal, number) => {
  // check if search is already in local storage
  const stored = window.localStorage.getItem(searchInput);
  if (stored) {
    setData(JSON.parse(stored).items);
  } else {
    const formattedInput = searchInput.replaceAll(" ", "%20");
    const fDetails = `?part=snippet&maxResults=${number}&q=`;
    const apiKey = `&key=${process.env.REACT_APP_API_KEY}`;
    fetch(URL + resource + fDetails + formattedInput + apiKey)
      .then((res) => res.json())
      .then((res) => {
        // if we receive a res error -> show modal
        if (res.error) {
          setModal(true);
        } else {
          window.localStorage.setItem(searchInput, JSON.stringify(res));
          setData(res.items);
        }
      })
      .catch((err) => {
        console.log(err);
        setModal(true);
      });
  }
};
