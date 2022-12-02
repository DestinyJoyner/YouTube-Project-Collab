import { useState, useEffect, useContext } from "react";
import { ContextData } from "../Provider/Provider";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import ChannelThumbnail from "./ChannelThumbnail";
import CommentForm from "./CommentForm";
import {
  convertDate,
  convertNumber,
  channelFetch,
  relatedToVideoFetch,
  viewsFetch,
  testViews,
  testChannels,
  testRelated,
} from "../Functions/functions";
import "./Video.css";
import tvImage from "./assets/channel-icon.png";
import darkTvImage from "./assets/red-channel-icon.png";
import RecentlyViewed from "./RecentlyViewed";

function Video() {
  const { id } = useParams();

  const {
    favData,
    setFavData,
    vidData,
    setVidData,
    relatedVids,
    setRelatedVids,
    channel,
    setChannel,
    darkMode,
    setModal,
    recent,
    setRecent
  } = useContext(ContextData);

  // state for favorite checkbox
  const checkboxState =
    favData.length > 0 ? favData.find(({ vidId }) => vidId === id) : false;
  const [clicked, setClicked] = useState(checkboxState ? true : false);

  // OnChange for checkbox to update favorites
  function handleCheckbox() {
    setClicked(!clicked);
    const favObj = {
      title: "",
      vidId: "",
      chanId: "",
      chanName: "",
      image: "",
    };
    vidData.forEach(({ id, snippet }) => {
      favObj.title = snippet.title;
      favObj.vidId = id;
      favObj.image = snippet.thumbnails.high.url;
      favObj.chanName = snippet.channelTitle;
      favObj.chanId = snippet.channelId;
    });

    if (clicked === false) {
      window.localStorage.setItem(
        "favorites",
        JSON.stringify([favObj, ...favData])
      );
    } else {
      const stored = JSON.parse(window.localStorage.getItem(`favorites`));
      const filtered = stored.filter(({ vidId }) => vidId !== id);
      setFavData(filtered);
      window.localStorage.setItem("favorites", JSON.stringify(filtered));
    }
  }

  // Use Effect for setting channel/related to states for video page
  // useEffect(() => {
  //   const videoData = JSON.parse(window.localStorage.getItem(`views-${id}`));
  //   console.log(videoData)
  //   const videoChannelId = videoData.items[0].snippet.channelId;
  //   console.log(videoChannelId)
  //   // const moreChannelData = JSON.parse(
  //   //   window.localStorage.getItem(`channel-${videoChannelId}`)
  //   // );
  //   const relatedVideosData = JSON.parse(window.localStorage.getItem(
  //     `related-to-video-${id}`
  //   ));

  //   if (videoData) {
  //     setVidData(videoData);
  //     // then check/ fetch for additional video info
  //     if (!window.localStorage.getItem(`channel-${videoChannelId}`)) {
  //       // fetch for channel id info
  //       channelFetch(videoChannelId, id, setModal, setChannel);
  //     } else {
  //       setChannel(JSON.parse(window.localStorage.getItem(`channel-${videoChannelId}`)));
  //     }
  //     if (!relatedVideosData) {
  //       // fetch for related videos based on id
  //       relatedToVideoFetch(id, setRelatedVids, setModal);
  //     } else {
  //       setRelatedVids(relatedVideosData);
  //     }
  //   } else {
  //     // fetch for videoData/related/and channel based on inputed id in url
  //     fetch(
  //       `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${id}&maxResults=1&key=${process.env.REACT_APP_API_KEY}`
  //     )
  //       .then((resp) => resp.json())
  //       .then((respJson) => {
  //         window.localStorage.setItem(`views-${id}`, JSON.stringify(respJson));
  //         setVidData(respJson);
  //         // use channelId property from respJson to fetch for/set channel data
  //         channelFetch(
  //           respJson.items[0].snippet.channelId,
  //           id,
  //           setModal,
  //           setChannel
  //         );
  //       })
  //       .catch((err) => setModal(true));
  //     // fetch for related videos
  //     relatedToVideoFetch(id, setRelatedVids, setModal);
  //   }
  // }, [id]);
  function addToRecents(value) {
    const vidTitle = JSON.parse(
      window.localStorage.getItem(`views-${value}`)
    )[0].snippet.localized.title;

    const newRecent = {
      id: value,
      title: vidTitle,
    };

    const duplicate = recent.filter(({ id }) => id === value);
    if (!Object.keys(duplicate).length) {
      window.localStorage.setItem(
        `recents`,
        JSON.stringify([newRecent, ...recent])
      );
      setRecent([newRecent, ...recent]);
    }
    //  navigate(`/video/${e.target.id}`);
    // navigate("/");
      // e.preventDefault()
    // console.log(e);
    // navigate(`/video/${e.target.id}`);
  }


  useEffect(() => {
    const isStored = JSON.parse(window.localStorage.getItem(`views-${id}`));
    let channelId;
    const channelStored = JSON.parse(
      window.localStorage.getItem(`channel-${channelId}`)
    );
    if (isStored) {
      setVidData(isStored);
      // console.log(isStored);
      channelId = isStored[0].snippet.channelId;
      if (channelStored) {
        setChannel(channelStored);
      } else {
        testChannels(channelId).then((respJson) => {
          window.localStorage.setItem(
            `channel-${channelId}`,
            JSON.stringify(respJson)
          );
          let count = 0;
          const filtered = respJson.items.filter((video) => {
            if (video.id.videoId !== id && count < 5) {
              count++;
              return video;
            }
          });
          setChannel(filtered);
        });
      }
    } else if (!isStored) {
      // fetch for individual fetch data
      testViews(id)
        .then((respJson) => {
          setVidData(respJson.items);
          window.localStorage.setItem(
            `views-${id}`,
            JSON.stringify(respJson.items)
          );

          // use snippet.channelId to fetch for more from channel
          channelId = respJson.items[0].snippet.channelId;
          testChannels(channelId)
            .then((respJson) => {
              window.localStorage.setItem(
                `channel-${channelId}`,
                JSON.stringify(respJson)
              );
              let count = 0;
              const filtered = respJson.items.filter((video) => {
                if (video.id.videoId !== id && count < 5) {
                  count++;
                  return video;
                }
              });
              setChannel(filtered);
            })
            .catch((err) => setModal(true));
        })
        .catch((err) => setModal(true));
    }

    // fetch for relatedVid
    const relatedStored = JSON.parse(
      window.localStorage.getItem(`related-to-video-${id}`)
    );
    if (relatedStored) {
      setRelatedVids(relatedStored);
    } else {
      testRelated(id)
        .then((respJson) => {
          window.localStorage.setItem(
            `related-to-video-${id}`,
            JSON.stringify(respJson)
          );
          setRelatedVids(respJson);
        })
        .catch((err) => setModal(true));
    }

    //  function on click to add video to recently viewed list
    addToRecents(id)
   

  }, [id]);

  return (
    <div className="videoPage">
      <div className="video">
        <YouTube
          videoId={id}
          opts={{
            height: 400,
            width: 650,
            h: {
              attributes: {
                sandbox: {
                  value:
                    "allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation",
                },
              },
            },
          }}
        />
      </div>

      <CommentForm videoId={id} />

      <RecentlyViewed />

      {vidData.length > 0 && (
        <section className="videoInfo">
          <h2>{vidData[0].snippet.localized.title}</h2>

          <h4>
            <img src={!darkMode ? tvImage : darkTvImage} alt="tv-icon" />
            <span>{vidData[0].snippet.channelTitle}</span>
          </h4>

          <div className="stats-div">
            <p className="stats">
              <span>
                Date added:{" "}
                {vidData[0].snippet.publishedAt
                  ? convertDate(vidData[0].snippet.publishedAt)
                  : null}
              </span>
              <span>
                {vidData[0].statistics.viewCount
                  ? convertNumber(vidData[0].statistics.viewCount)
                  : null}{" "}
                views
              </span>
              <span id="fav-checkbox">
                <label htmlFor="checkbox">
                  <input
                    type="checkbox"
                    checked={clicked}
                    onChange={() => handleCheckbox()}
                  />
                  <span>Add to Favorites</span>
                </label>
              </span>
            </p>
          </div>
          <p className="description">
            {vidData[0].snippet.localized.description
              ? vidData[0].snippet.localized.description
              : "No Description Available"}
          </p>
        </section>
      )}

      {/* {vidData &&
        <section className="videoInfo">
        <h2>{vidData.items[0].snippet.localized.title}</h2>

        <h4>
          <img src={!darkMode ? tvImage : darkTvImage} alt="tv-icon" />
          <span>{vidData.items[0].snippet.channelTitle}</span>
        </h4>

        <div className="stats-div">
          <p className="stats">
            <span>
              Date added:{" "}
              {vidData.items[0].snippet.publishedAt
                ? convertDate(vidData.items[0].snippet.publishedAt)
                : null}
            </span>
            <span>
              {vidData.items[0].statistics.viewCount
                ? convertNumber(vidData.items[0].statistics.viewCount)
                : null}{" "}
              views
            </span>
            <span id="fav-checkbox">
              <label htmlFor="checkbox">
                <input
                  type="checkbox"
                  checked={clicked}
                  onChange={() => handleCheckbox()}
                />
                <span>Add to Favorites</span>
              </label>
            </span>
          </p>
        </div>
        <p className="description">
          {vidData.items[0].snippet.localized.description}
        </p>
      </section>
} */}
      <section className="related">
        {vidData.length > 0 && (
          <h4>More from {vidData[0].snippet.channelTitle}:</h4>
        )}
        <div className="moreVids">
          {channel.length > 1 &&
            channel.map((obj) => (
              <ChannelThumbnail key={obj.id.videoId} obj={obj} />
            ))}
        </div>
      </section>

      <section className="related">
        <h4>You May Also Like:</h4>
        <div className="moreVids">
          {relatedVids &&
            relatedVids.items.map((obj) => {
              if (obj.id.videoId) {
                return <ChannelThumbnail key={obj.id.videoId} obj={obj} />;
              }
            })}
        </div>
      </section>
    </div>
  );
}

export default Video;
