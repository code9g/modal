import clsx from "clsx";
import PropTypes from "prop-types";
import { useRef } from "react";
import closeIcon from "../assets/close.svg";
import Modal from "../lib/Modal";

function MessageModal({ isOpen, close, children }) {
  const ref = useRef(null);

  return (
    <Modal
      className="flex items-center justify-center bg-slate-500/25 transition-all duration-300"
      closeClass="opacity-0"
      isOpen={isOpen}
      onEscape={close}
      onMouseOut={close}
    >
      <div
        ref={ref}
        className={clsx(
          "relative w-1/3 rounded-xl bg-white p-10 shadow",
          "transition-transform duration-300",
          !isOpen && "-translate-y-full"
        )}
      >
        <button
          type="button"
          className={clsx(
            "absolute  right-0 top-0 size-10 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-700 p-2 hover:bg-blue-800"
          )}
          onClick={close}
        >
          <img
            className="size-full object-cover"
            src={closeIcon}
            alt="close modal"
          />
        </button>
        <div>{children}</div>
      </div>
    </Modal>
  );
}

MessageModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export default MessageModal;
