import { useNavigate } from "react-router-dom";
import "./Modal.css";

export default function Modal({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  if (!isOpen) return null;
  return (
    <>
      <div className="overlay" />
      <div className="modal">
        <h3>Modal Test</h3>
        <p>something went wrong</p>
        <button
          onClick={() => {
            setIsOpen(false);
            // navigate("/");
          }}
        >
          x
        </button>
      </div>
    </>
  );
}
