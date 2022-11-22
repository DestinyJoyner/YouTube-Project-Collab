import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../Provider/Provider";
import "./Modal.css";

export default function Modal() {
  const { isOpen, setIsOpen } = useContext(ContextData);
  const navigate = useNavigate();

  if (!isOpen) return null;
  return (
    <>
      <div className="overlay" />
      <div className="modal">
        <h3>Error</h3>
        <p>something went wrong... close window to be redirected home</p>
        {/* button to be placed in top corner */}
        <button
          onClick={() => {
            setIsOpen(false);
            navigate("/");
          }}
        >
          x
        </button>
      </div>
    </>
  );
}
