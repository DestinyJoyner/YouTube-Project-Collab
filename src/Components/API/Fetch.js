const URL = "https://youtube.googleapis.com/youtube/v3/";

export const fetchData = (
  resource,
  searchInput,
  setData,
  order,
  number
) => {
  const lowerCase = searchInput.toLowerCase();
  const storageVar = `${lowerCase} ${order} ${number}`;
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
          // setModal(true)
        } else {
          // store search keyword, order and num in local storage
          window.localStorage.setItem(storageVar, JSON.stringify(res));
          setData(res.items);
          // call fetch for channel info and video info here for each video insearch result and save by id in local storage.
          res.items.forEach(({id,snippet}) => {
            fetch( `https://youtube.googleapis.com/youtube/v3/search?part=snippet&$channelId=${snippet.channelId}&maxResults=6&type=video&key=${process.env.REACT_APP_API_KEY}`)
            .then(resp => resp.json())
            .then(respJson => {
              let count = 0;
              const filtered = respJson.items.filter((video) => {
              if (video.id.videoId !== id && count < 5) {
              count++;
              return video;
            }
          })
          window.localStorage.setItem(`channel-${snippet.channelId}`, filtered)
            })
            .catch(err => console.log(err) /* setModal(true) */)
            
            // fetch for video info
            fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&relatedToVideoId=${id.videoId}&type=video&key=${process.env.REACT_APP_API_KEY}`)
            .then((resp) => resp.json())
            .then((respJson) => window.localStorage.setItem(`video-${id.videoId}`, respJson))
            .catch((err) => console.log(err));
          })
          
        }
      })
      .catch((err) => {
        console.log(err);
        
      });
  }
};
