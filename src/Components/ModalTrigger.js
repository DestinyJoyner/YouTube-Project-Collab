import { useEffect } from "react";
import { useContext } from "react";
import { ContextData } from "../Provider/Provider";

export default function ModalTrigger({ isTrue}) {
  /* removed props
    setIsOpen
  */
// test context
const {setIsOpen} = useContext(ContextData)
  
  // useEffect allows for useState to update before rendering
  useEffect(() => {
    if (isTrue) {
      setIsOpen(isTrue);
    }
  }, []);
  return;
}
