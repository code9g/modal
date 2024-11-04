import clsx from "clsx";
import PropTypes from "prop-types";
import { useRef } from "react";
import Modal from "../lib/Modal";
import SignInForm from "./SignInForm";

function SignInFormModal({
  isOpen,
  close,
  onOpen,
  onSubmit,
  onCancel,
  onClose,
}) {
  const formRef = useRef(null);

  const handleCancel = () => {
    if (oncancel) {
      onCancel();
    }
    close();
  };

  const handleSubmit = (credentials) => {
    onSubmit(credentials);
    close();
  };

  const handleOpen = (e) => {
    formRef.current.reset();
    if (onOpen) {
      onOpen(e);
    }
  };

  return (
    <Modal
      className="flex items-center justify-center bg-slate-500/25 transition-all duration-300"
      closeClass="opacity-0"
      isOpen={isOpen}
      onOpen={handleOpen}
      onClose={onClose}
      onEscape={handleCancel}
      onMouseOut={handleCancel}
    >
      <SignInForm
        ref={formRef}
        className={clsx(
          "transition-transform duration-300",
          !isOpen && "translate-y-full"
        )}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Modal>
  );
}

SignInFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onOpen: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
};

export default SignInFormModal;
