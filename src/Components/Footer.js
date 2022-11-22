import { Link } from "react-router-dom";
import goldEgg from "../Provider/gold-egg.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      Dan & Destiny 
      <Link to="/overkill" className="egg">
        <img src={goldEgg} alt="golden egg" />
      </Link> Nov 2022
    </footer>
  );
}
