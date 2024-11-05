import { CLOSE_EVENT, OPEN_ATTRIBUTE, OPEN_EVENT } from "./consts";

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

export const defineModal = (modal) => {
  observer.observe(modal, options);
  Object.defineProperty(modal, OPEN_ATTRIBUTE, attributes);
  modal.showModal = () => (modal.open = true);
  modal.close = () => (modal.open = false);
};

const FOCUS_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const focusSelector = (target) => target.querySelector(FOCUS_SELECTOR);

export const focusSelectors = (target) =>
  target.querySelectorAll(FOCUS_SELECTOR);

export const handleAutoFocus = (e) => {
  const element = focusSelector(e.target);
  if (element) {
    setTimeout(() => {
      element.focus();
    }, 100);
  }
};
