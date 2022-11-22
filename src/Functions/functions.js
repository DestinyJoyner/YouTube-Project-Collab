// fetch function for view count stats
function fetchViews(url, videoId, errorHan) {
  const storageKeys = Object.keys(window.localStorage);
  const storedVid = storageKeys.find(({ id }) => id.videoId? id.videoId === videoId : id === videoId);
  if(storedVid.snippet.views === ""){
    fetch(
    `${url}videos?part=snippet%2C%20statistics&id=${videoId}&maxResults=1&key=${process.env.REACT_APP_API_KEY}`
  )
    .then((resp) => resp.json())
    .then((respJson) => {
      if(storedVid){
        storedVid.snippet.views = convertNumber(respJson.items[0].statistics.viewCount)
      } else {
        const videoFetchData = `video-${videoId}`;
        respJson.items[0].snippet.views = convertNumber(respJson.items[0].statistics.viewCount)
        window.localStorage.setItem(videoFetchData, JSON.stringify(respJson));
      }
    })
    .catch((err) => console.log(err));
}
  }
  

// function to convert views number
function convertNumber(num) {
  return num
    .split(``)
    .reverse()
    .join(``)
    .match(/.{1,3}/g)
    .join(`,`)
    .split(``)
    .reverse()
    .join(``);
}

function convertDate(str) {
  let date = str.slice(2, 10).split("-");
  date.push(date[0]);
  date.shift();
  return date.join("/");
}

export { convertNumber, convertDate };
