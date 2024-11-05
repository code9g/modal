import { useState } from "react";

const useToggleableState = (defaultToggleableState) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((current) => !current);
  return { isOpen, open, close };
};

export default useToggleableState;
