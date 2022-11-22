import { useEffect, useContext } from "react";
import { ContextData } from "../Provider/Provider";

export default function ModalTrigger({ isTrue }) {
  const { setModal } = useContext(ContextData);

  // useEffect updates the state
  useEffect(() => {
    if (isTrue) {
      setModal(isTrue);
    }
  }, []);
  return;
}
