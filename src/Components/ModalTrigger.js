import { useEffect } from "react";

export default function ModalTrigger({ isTrue, setIsOpen }) {
  // useEffect allows for useState to update before rendering
  useEffect(() => {
    if (isTrue) {
      setIsOpen(isTrue);
    }
  }, []);
  return;
}
