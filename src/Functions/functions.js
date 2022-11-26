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
  items: [
    {
      id: {
        videoId: ""
      },
      snippet: 
      {
        channelId:  "",
        channelTitle: "",
        description: "",
        liveBroadcastContent: "",
        publishTime: "",
        publishedAt: "",
        thumbnails: {
          high: {
            url: "",
          }
        },
        title: "",
    }
  }
  ]
}


export { fetchViews, convertNumber, convertDate, empty, videoThumbnailEmpty };
