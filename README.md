# code9g-modal

A react component to create and customize modals.

## Installation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

```
npm i code9g-modal
```

or

```
yarn add code9g-modal
```

## Documentation

- isOpen: Define is the modal is open or close
- onOpen: Call function when the modal is opened
- onClose: Call function when the modal is closed
- onMouseOut: Call function when the mouse click on "modal" (not in element in children)
- onEscape: Call function when the user use escape key
- autoFocus: Define if the auto focus is used when the modal opening
- focusTrap: Define if the tabulation stay in modal
- openClass and closeClass: This class is used when modal is open or close (custom class)

## Examples

```jsx
function App() {
  let subtitle;
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleOpen = () => {
    console.log("The modal opened !");
  };

  const handleClose = () => {
    console.log("The modal opened !");
  };

  return (
    <div>
      <button type="button" onClick={open}>
        Open Modal
      </button>
      <Modal
        className="flex items-center justify-center bg-slate-500/25 transition-all duration-300"
        openClass=""
        closeClass="opacity-0"
        className="modal"
        isOpen={isOpen}
        onOpen={handleOpen}
        onClose={handleClose}
        onMouseOut={close}
        onEscape={close}
        autoFocus
        focustrap
      >
        <div
          className={clsx(
            "relative w-1/3 rounded-xl bg-white p-10 shadow",
            "transition-transform duration-300",
            !isOpen && "-translate-y-full"
          )}
        >
          <h2>Hello</h2>
          <form>
            <input type="text" />
            <button type="button">Submit</button>
          </form>
          <button type="button" onClick={close}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
```
