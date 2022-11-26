import { Link } from "react-router-dom";
import goldEgg from "./assets/gold-egg.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      Dan M. & Destiny J.
      <Link to="/overkill" className="egg">
        <img src={goldEgg} alt="golden egg" />
      </Link> Nov 2022
    </footer>
  );
}
