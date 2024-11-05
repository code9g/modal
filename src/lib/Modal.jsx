import { clsx } from "clsx";
import PropTypes from "prop-types";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { CLOSE_EVENT, OPEN_EVENT } from "./consts";
import { defineModal, focusSelectors, handleAutoFocus } from "./functions";

/**
 * Composant qui permet l'affichage d'une fenêtre modale
 *
 * @component
 *
 * @param {Object} props Les propriétés passées au composant
 * @param {boolean} props.isOpen Indique si la modale est ouverte ou fermée
 * @param {function} props.onOpen Fonction de rappel lorsque la modale est ouverte
 * @param {function} props.onClose Fonction de rappel lorsque la modale est fermée
 * @param {function} props.onMouseOut  Fonction de rappel lorsque l'utilisateur clique en-dehors de la "modale"
 * @param {function} props.onEscape fonction de rappel lorsque l'utilisateur appuie sur la touche d'échappement
 * @param {string|any} props.openClass Classe à utiliser avec className lorsque la modale est ouverte
 * @param {string|any} props.closeClass Classe à utiliser avec className lorsque la modale est fermée
 * @param {boolean} props.autoFocus Permet de gérer l'autofocus lorsque la modale s'ouvre
 * @param {boolean} props.focusTrap Permet de gérer la tabulation afin qu'elle demeure au sein de la modale
 * @param {string|anly} props.className Permet de personnaliser une partie du className de la modale
 * @param {object} props.style Permet de personnaliser une partie du style de la modale
 * @param {React.ReactNode} props.children - Contenu à afficher dans la modale
 *
 * @returns {React.ReactElement} Un élément React représentant la modale
 *
 * @function
 * @name Modal
 */
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
        defineModal(modal);
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
            const elements = focusSelectors(innerRef.current);

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
