import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../Provider/Provider";
import "./Modal.css";
import errorPic from "./assets/uh-oh.gif"

export default function Modal() {
  const { modal, setModal } = useContext(ContextData);
  const navigate = useNavigate();

  if (!modal) return null;
  return (
    <>
      <div className="overlay" />
      <div className="modal">
        <h3>Error</h3>
        <p>Oops! something went wrong... close window to be redirected home</p>
        <img src = {errorPic} alt= 'error-pic' />
        <button
          onClick={() => {
            setModal(false);
            navigate("/");
          }}
        >
         <span>x</span> 
        </button>
      </div>
    </>
  );
}
