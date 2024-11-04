import { clsx } from "clsx";
import PropTypes from "prop-types";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";

const OPEN_ATTRIBUTE = "open";

const OPEN_EVENT = "open";
const CLOSE_EVENT = "close";

const openCustomEvent = new CustomEvent(OPEN_EVENT);
const closeCustomEvent = new CustomEvent(CLOSE_EVENT);

const observer = new MutationObserver((records) => {
  for (const { target } of records) {
    if (target.hasAttribute(OPEN_ATTRIBUTE)) {
      target.dispatchEvent(openCustomEvent);
    } else {
      target.dispatchEvent(closeCustomEvent);
    }
  }
});

const options = {
  attributeFilter: [OPEN_ATTRIBUTE],
  attributes: true,
};

const attributes = {
  enumerable: true,
  configurable: true,
  get: function () {
    return this.hasAttribute(OPEN_ATTRIBUTE);
  },
  set: function (value) {
    if (value === true) {
      this.setAttribute(OPEN_ATTRIBUTE, "");
    } else {
      this.removeAttribute(OPEN_ATTRIBUTE);
    }
  },
};

const focusSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const handleAutoFocus = (e) => {
  const element = e.target.querySelector(focusSelector);
  if (element) {
    setTimeout(() => {
      element.focus();
    }, 100);
  }
};

const Modal = forwardRef(
  (
    {
      isOpen,
      onOpen,
      onClose,
      onMouseOut,
      onEscape,
      openClass,
      closeClass,
      autoFocus = true,
      focusTrap = true,
      className,
      style,
      children,
      ...args
    },
    ref
  ) => {
    const innerRef = useRef(null);
    useImperativeHandle(ref, () => innerRef?.current);

    useEffect(() => {
      const modal = innerRef?.current;
      if (modal) {
        observer.observe(modal, options);
        Object.defineProperty(modal, OPEN_ATTRIBUTE, attributes);
        modal.show = () => (modal.open = true);
        modal.close = () => (modal.open = false);
      }
    }, []);

    // AutoFocus management
    useEffect(() => {
      if (autoFocus) {
        const modal = innerRef?.current;
        if (modal) {
          modal.addEventListener(OPEN_EVENT, handleAutoFocus);
          return () => {
            modal.removeEventListener(OPEN_EVENT, handleAutoFocus);
          };
        }
      }
    }, [autoFocus]);

    // Open event management
    useEffect(() => {
      if (onOpen) {
        const modal = innerRef.current;
        if (modal) {
          modal.addEventListener(OPEN_EVENT, onOpen);
          return () => {
            modal.removeEventListener(OPEN_EVENT, onOpen);
          };
        }
      }
    }, [onOpen]);

    // Close event management
    useEffect(() => {
      if (onClose) {
        const modal = innerRef.current;
        if (modal) {
          modal.addEventListener(CLOSE_EVENT, onClose);
          return () => {
            modal.removeEventListener(CLOSE_EVENT, onClose);
          };
        }
      }
    }, [onClose]);

    // Tabulation management (focus trap)
    useEffect(() => {
      if (focusTrap) {
        const keyEvent = (e) => {
          if (innerRef.current.open && e.key === "Tab") {
            const elements = innerRef.current.querySelectorAll(focusSelector);

            const [first, last] = e.shiftKey
              ? [elements.length - 1, 0]
              : [0, elements.length - 1];

            if (document.activeElement === elements[last]) {
              e.preventDefault();
              elements[first].focus();
            }
          }
        };

        document.addEventListener("keydown", keyEvent);
        return () => {
          document.removeEventListener("keydown", keyEvent);
        };
      }
    }, [focusTrap]);

    // Mouse out Management
    useEffect(() => {
      if (onMouseOut) {
        const mouseEvent = (e) => {
          if (innerRef.current.open && e.target === innerRef.current) {
            onMouseOut(e);
          }
        };
        document.addEventListener("click", mouseEvent);
        return () => {
          document.removeEventListener("click", mouseEvent);
        };
      }
    }, [onMouseOut]);

    // Escape management
    useEffect(() => {
      if (onEscape) {
        const keyEvent = (e) => {
          if (innerRef.current.open && e.key === "Escape") {
            onEscape(e);
          }
        };
        document.addEventListener("keydown", keyEvent, { bubble: false });
        return () => {
          document.removeEventListener("keydown", keyEvent);
        };
      }
    }, [onEscape]);

    return createPortal(
      <div
        open={isOpen}
        className={clsx(className, isOpen ? openClass : closeClass)}
        style={{
          ...style,
          position: "fixed",
          inset: 0,
          visibility: isOpen ? "visible" : "hidden",
        }}
        {...args}
        ref={innerRef}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        {children}
      </div>,
      document.getElementById("root")
    );
  }
);

Modal.displayName = "Modal";

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onEscape: PropTypes.func,
  onMouseOut: PropTypes.func,
  autoFocus: PropTypes.bool,
  focusTrap: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  openClass: PropTypes.string,
  closeClass: PropTypes.string,
  children: PropTypes.any,
};

export default Modal;
