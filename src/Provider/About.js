import { Link } from "react-router-dom";
import "./About.css";
import gitHub from "./grey-gitHub(2).png";
import linkedIn from "./red-linkedIn.png";
import mail from "./dark-mail-icon.png";
import destinyAbout from "./you-tube-about.png";

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
              <Link to="https://www.linkedin.com/in/destiny-joyner-934846243/">
                <img src={linkedIn} alt="linkedIn" height="80px" />
              </Link>
            </div>
            <div className="circle2">
              <Link to="https://github.com/DestinyJoyner">
                <img src={gitHub} alt="gitHub" height="80px" />
              </Link>
            </div>
            <div className="circle3">
              <Link to="#">
                <img src={mail} alt="email" height="80px" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}

export default About;
