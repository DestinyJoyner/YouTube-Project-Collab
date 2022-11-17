URL = "https://youtube.googleapis.com/youtube/v3/";

export const fetchData = (resource, searchInput, setData, setModal, order, number) => {
  const lowerCase = searchInput.toLowerCase();
  const storageVar = `${lowerCase} ${order} ${number}`
  // check if search is already in local storage
  const stored = window.localStorage.getItem(storageVar);
  if (stored) {
    setData(JSON.parse(stored).items);
  } else {
    const formattedInput = lowerCase.replaceAll(" ", "%20");
    const fDetails = `?part=snippet&maxResults=${number}&order=${order}&q=`;
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
          window.localStorage.setItem(storageVar, JSON.stringify(res));
          setData(res.items);
        }
      })
      .catch((err) => {
        console.log(err);
        setModal(true);
      });
  }
};
