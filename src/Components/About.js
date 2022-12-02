
import { useEffect } from "react";
import "./About.css";
import gitHub from "./assets/grey-gitHub(2).png";
import linkedIn from "./assets/red-linkedIn.png";
import mail from "./assets/dark-mail-icon.png";
import destinyAbout from "./assets/you-tube-about.png";
import danAvatar from "../Components/assets/Dan-icon.png";

function About() {

  useEffect(()=> {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="aboutPage">
      <div className="about-project">
        <h1>About the Project</h1>
        <hr />
        <br />
        <p>
          The objective of this project was to create a Front End YouTube clone
          application. The application was built in <a id="react-link" href="https://beta.reactjs.org/learn" target="_blank"> React</a>, and utilizes the
          <a href="https://developers.google.com/youtube/documentation?hl=en_US" target="_blank"> YouTube V3 API</a> to gain access to their video data. Through pair
          programming we were able to implement several functionalities.
        </p>
        <br />
        <p>
          The home page randomly selects topics chosen by the devs to display as
          video suggestions.The search bar allows the selection of a sorting
          method and number of results to display. The video page allows the
          user to watch the video, as well as adding it to a favorites page,
          leaving a comment, and to view previously opened videos. In addition,
          more videos from the same channel and related content is presented
          below the video details.
        </p>
        <br />
        <p>
          It is also possible to perform a video search directly in the url. The
          user will type their search keyword(s) after "/search" and may also
          add a sorting method (date, relevance, or viewCount) as well as the
          number of search results.
        </p>
        <p> Example: <span>/search/programming/viewCount/18</span></p>
        <br />
        <p>
          A dark mode theme is available, and some media queries were added to
          account for different screen sizes.
        </p>
      </div>
      <section className="devs">
        <div className="about-destiny">
          <section className="destiny-details">
            <img src={destinyAbout} alt="destiny" />
            <div className="bio">
              <h4>Destiny J.</h4>
              <p>
                Born and raised in Harlem, USA, I've always had a flare for
                solving math and logic puzzles.
              </p>
              <p>
                I am intrigued by the Metaverse and eager to learn the skills
                needed to create virtual immersive digital worlds.
              </p>
              <p>
                In my spare time, when I'm not coordinating my hats with my
                clothing, I enjoy tinkering with international recipes, jogging,
                and gaming.{" "}
              </p>
            </div>
            <div className="circles">
              <div className="circle1">
                <a
                  href="https://www.linkedin.com/in/destiny-joyner-934846243/"
                  target="_blank"
                >
                  <img src={linkedIn} alt="linkedIn" />
                </a>
              </div>
              <div className="circle2">
                <a href="https://github.com/DestinyJoyner" target="_blank">
                  <img src={gitHub} alt="gitHub" />
                </a>
              </div>
              <div className="circle3">
                <a href="mailto:destinyjoyner@pursuit.com">
                  <img src={mail} alt="email" />
                </a>
              </div>
            </div>
          </section>
        </div>

        <div className="about-dan">
          <section className="dan-details">
            <img src={danAvatar} alt="dan" />
            <div className="bio">
              <h4>Dan M.</h4>
              <p>Grew up in Italy, now living in NYC.</p>
              <p>
                Looking forward to learning more about sustainability, resource
                optimization, AI, spacial analysis, and sports analytics in the
                tech field.
              </p>
              <p>
                In my free time I enjoy museums, soccer, traveling, dance music
                events, and cooking.
              </p>
            </div>
            <div className="circles">
              <div className="circle1">
                <a href="https://www.linkedin.com/in/mazzilli-daniel/"
                target="_blank">
                  <img src={linkedIn} alt="linkedIn" />
                </a>
              </div>
              <div className="circle2">
                <a href="https://github.com/Daniel-Mazzilli" target="_blank">
                  <img src={gitHub} alt="gitHub" />
                </a>
              </div>
              <div className="circle3">
                <a href="mailto:danmazzilli@pursuit.com">
                  <img src={mail} alt="email" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default About;
