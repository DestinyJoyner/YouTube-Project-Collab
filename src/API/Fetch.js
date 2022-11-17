URL = "https://youtube.googleapis.com/youtube/v3/";

export const fetchData = (resource, searchInput, setData, setModal, number) => {
  const lowerCase = searchInput.toLowerCase();
  // check if search is already in local storage
  const stored = window.localStorage.getItem(lowerCase);
  if (stored) {
    setData(JSON.parse(stored).items);
  } else {
    const formattedInput = lowerCase.replaceAll(" ", "%20");
    const fDetails = `?part=snippet&maxResults=${number}&q=`;
    const type = `&type=video`;
    const apiKey = `&key=${process.env.REACT_APP_API_KEY}`;
    fetch(URL + resource + fDetails + formattedInput + type + apiKey)
      .then((res) => res.json())
      .then((res) => {
        // if we receive a res error -> show modal
        if (res.error) {
          setModal(true);
        } else {
          // filtering out non video results
          // const resFiltered = res.items.filter((el) =>
          //   Object.keys(el.id).includes("videoId")
          // );
          // res.items = resFiltered;
          window.localStorage.setItem(lowerCase, JSON.stringify(res));
          setData(res.items);
        }
      })
      .catch((err) => {
        console.log(err);
        setModal(true);
      });
  }
};
