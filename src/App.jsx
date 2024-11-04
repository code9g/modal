import "./App.css";
import Button from "./components/Button";
import MessageModal from "./components/MessageModal";
import SignInFormModal from "./components/SignInFormModal";
import useToggleableState from "./utils/useToggleableState";

function App() {
  const {
    isOpen: isOpenSignUp,
    open: openSignUp,
    close: closeSignUp,
  } = useToggleableState(true);

  const {
    isOpen: isOpenMessage,
    open: openMessage,
    close: closeMessage,
  } = useToggleableState(false);

  return (
    <>
      <main className="container m-auto py-4">
        <Button variant="outline" className="my-10" onClick={openSignUp}>
          Sign In
        </Button>

        <div>
          {Array.from(new Array(10), (x, i) => i).map((value, index) => (
            <p key={index} className="mb-5">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus
              accusamus maxime nemo optio deleniti fugit nam nihil eveniet
              dolorem laudantium? Quis necessitatibus ratione culpa! Eos,
              recusandae rem? Veniam laudantium aliquid nesciunt minima eum
              corrupti. Suscipit officia nesciunt nostrum laboriosam. Culpa qui
              distinctio soluta laborum, illum quasi perspiciatis eius cum
              tempora, eligendi debitis, laudantium perferendis obcaecati
              dignissimos ad pariatur velit fugit similique dolor ea. Voluptatem
              quia molestiae quaerat ut optio quae repudiandae animi esse
              laborum, natus obcaecati delectus quo vitae hic aut molestias
              nesciunt laboriosam magni eos exercitationem non? Maiores commodi
              sit
            </p>
          ))}
        </div>
      </main>
      <SignInFormModal
        isOpen={isOpenSignUp}
        close={closeSignUp}
        onSubmit={(credentials) => {
          console.log(credentials);

          openMessage();
        }}
        onCancel={() => {
          console.log("App SignUp: Cancel");
        }}
      />
      <MessageModal isOpen={isOpenMessage} close={closeMessage}>
        <p className="text-center text-3xl italic">
          You&apos;re successfully logged !
        </p>
      </MessageModal>
    </>
  );
}

export default App;
