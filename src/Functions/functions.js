// fetch function for view count stats
// localStorage not updating as we wish :'(
function fetchViews(url, videoId, errorHan, viewsArr, num, setData) {
  let match = {};
  let index;
  if (Object.keys(window.localStorage).length) {
    for (let obj in window.localStorage) {
      const objJson = JSON.parse(window.localStorage.getItem(obj));
      match = objJson.find((item, i) => {
        if (item.id.videoId === videoId || item.id === videoId) {
          index = i;
          fetch(
            `${url}videos?part=snippet%2C%20statistics&id=${videoId}&maxResults=1&key=${process.env.REACT_APP_API_KEY}`
          )
            .then((resp) => resp.json())
            .then((respJson) => {
              item.snippet.views = convertNumber(
                respJson.items[0].statistics.viewCount
              );
              item.snippet.liveBroadcastContent = convertNumber(
                respJson.items[0].statistics.viewCount
              );
              console.log(item.snippet.liveBroadcastContent);
            })
            .catch((err) => {
              console.log(err);
              errorHan(true);
            });
          viewsArr.push(item);

          if (viewsArr.length === num) {
            const testArr = [...viewsArr];
            setData(viewsArr);
            const objBckp = obj;
            console.log("obj", obj);
            window.localStorage.clear();
            window.localStorage.setItem(
              objBckp + "edit",
              JSON.stringify(testArr)
            );
            console.log("created");
          }
          return item;
        }
      });
      if (match.kind) {
        break;
      }
    }
    if (!match.kind) {
      fetch(
        `${url}videos?part=snippet%2C%20statistics&id=${videoId}&maxResults=1&key=${process.env.REACT_APP_API_KEY}`
      )
        .then((resp) => resp.json())
        .then((respJson) => {
          respJson.snippet.views = convertNumber(
            respJson.items[0].statistics.viewCount
          );
          const videoFetchData = `video-${videoId}`;
          window.localStorage.setItem(videoFetchData, JSON.stringify(respJson));
        })
        .catch((err) => {
          console.log(err);
          errorHan(true);
        });
    }
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
// function to convert date to mm/dd/yy format
function convertDate(str) {
  let date = str.slice(2, 10).split("-");
  date.push(date[0]);
  date.shift();
  return date.join("/");
}

const empty = {
  items: [
    {
      snippet: {
        localized: {
          title: "",
          description: "",
        },
        thumbnails: {
          high: {
            url: "",
          },
        },
        publishedAt: "",
        channelTitle: "",
      },
      statistics: {
        viewCount: "",
      },
      id: {
        kind: "",
        videoId: "",
      },
    },
  ],
};

const videoThumbnailEmpty = {
  etag: "",
  items: [
    {
      id: {
        videoId: "",
      },
      snippet: {
        channelId: "",
        channelTitle: "",
        description: "",
        liveBroadcastContent: "",
        publishTime: "",
        publishedAt: "",
        thumbnails: {
          high: {
            url: "",
          },
        },
        title: "",
      },
      statistics: {
        viewCount: "",
      },
    },
  ],
};

/* FETCH FOR VIEWS, CHANNEL AND RELATED FOR VIDEO PAGE */
//   fetch for video with stats/views
function viewsFetch(idValue, errorFunc) {
  fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${idValue}&maxResults=1&key=${process.env.REACT_APP_API_KEY}`
  )
    .then((resp) => resp.json())
    .then((respJson) =>
      window.localStorage.setItem(`views-${idValue}`, JSON.stringify(respJson.items))
    )
    .catch((err) => errorFunc(true));
}

/* 
  'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCWJ2lWNubArHWmf3FIHbfcQ&maxResults=5&type=video&key=[YOUR_API_KEY]'
*/
//  // fetch for channel id info
function channelFetch(idValue, thisVideoId, errorFunc, setFunction) {
  fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${idValue}&maxResults=6&type=video&key=${process.env.REACT_APP_API_KEY}`
  )
    .then((resp) => resp.json())
    .then((respJson) => {
      let count = 0;
      const filtered = respJson.items.filter((video) => {
        if (video.id.videoId !== thisVideoId && count < 5) {
          count++;
          return video;
        }
      });
      window.localStorage.setItem(
        `channel-${idValue}`,
        JSON.stringify(filtered)
      );
      setFunction(filtered);
    })
    .catch((err) => errorFunc(true));
}

// fetch for related to video info
function relatedToVideoFetch(idValue, setFunction, errorFunc) {
  fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&relatedToVideoId=${idValue}&type=video&key=${process.env.REACT_APP_API_KEY}`
  )
    .then((resp) => resp.json())
    .then((respJson) => {
      window.localStorage.setItem(
        `related-to-video-${idValue}`,
        JSON.stringify(respJson)
      );
      setFunction(respJson);
    })
    .catch((err) => errorFunc(true));
}


// test views fetch (without 2nd then)
function testViews(idValue){
  return fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${idValue}&maxResults=1&key=${process.env.REACT_APP_API_KEY}`
  )
    .then((resp) => resp.json())
}

function testChannels(idValue){
  return fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${idValue}&maxResults=6&type=video&key=${process.env.REACT_APP_API_KEY}`
  )
    .then((resp) => resp.json())
}

function testRelated(idValue){
  return fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&relatedToVideoId=${idValue}&type=video&key=${process.env.REACT_APP_API_KEY}`
  )
    .then((resp) => resp.json())
}

 // function on click to add video to recently viewed list
 function addToRecents(e, stateVar, setFunction) {
  const vidTitle = JSON.parse(window.localStorage.getItem(`views-${e.target.name}`))[0].snippet.localized.title
  
  const newRecent = {
     id: e.target.name,
     title: vidTitle, 
   }
   
   const duplicate = stateVar.filter(({id}) => id === e.target.name)
   if(!Object.keys(duplicate).length){
     window.localStorage.setItem(`recents`, JSON.stringify([newRecent, ...stateVar]))
     setFunction([newRecent, ...stateVar])
   }
 }

export {
  fetchViews,
  convertNumber,
  convertDate,
  empty,
  videoThumbnailEmpty,
  channelFetch,
  relatedToVideoFetch,
  viewsFetch,
  testViews,
  testChannels,
  testRelated,
  addToRecents,
};
