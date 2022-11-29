import { Link } from "react-router-dom";
import "./About.css";
import gitHub from "./grey-gitHub(2).png";
import linkedIn from "./red-linkedIn.png";
import mail from "./dark-mail-icon.png";
import destinyAbout from "./you-tube-about.png";
import danAvatar from "../Components/assets/dan-avatar.jpg"

function About(props) {
  return (
    <div className="aboutPage">
     <h1>ABOUT PAGE</h1>

      <article className="about-destiny">
        <section className="destiny-details">
          <img src={destinyAbout} alt="destiny" />
          <p>
            <h4>Destiny J.</h4>
            about me yadda yadda yadda
          </p>
          <div className="circles">
            <div className="circle1">
              <a
              href="https://www.linkedin.com/in/destiny-joyner-934846243/">
                <img src={linkedIn} alt="linkedIn" height="80px" />
              </a>
            </div>
            <div className="circle2">
              <a
              href="https://github.com/DestinyJoyner" target="_blank">
                <img src={gitHub} alt="gitHub" height="80px" />
              </a>
            </div>
            <div className="circle3">
            <a 
            href="mailto:destinyjoyner@pursuit.com">
                <img src={mail} alt="email" height="80px" />
            </a>
            </div>
          </div>
        </section>
      </article>

      <article className="about-dan">
        <section className="dan-details">
          <img src={danAvatar} alt="dan" />
          <p>
            <h4>Dan M.</h4>
            about me yadda yadda yadda
          </p>
          <div className="circles">
            <div className="circle1">
              <a
              href="https://www.linkedin.com/in/destiny-joyner-934846243/">
                <img src={linkedIn} alt="linkedIn" height="80px" />
              </a>
            </div>
            <div className="circle2">
              <a
              href="https://github.com/DestinyJoyner" target="_blank">
                <img src={gitHub} alt="gitHub" height="80px" />
              </a>
            </div>
            <div className="circle3">
            <a 
            href="mailto:destinyjoyner@pursuit.com">
                <img src={mail} alt="email" height="80px" />
            </a>
            </div>
          </div>
        </section>
      </article>

    </div>
  );
}

export default About;
