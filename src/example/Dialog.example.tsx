import { useState } from "react";
import Dialog from "../components/Dialog/Dialog";

const DialogExample = () => {
  const [x, setX] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setX(!x);
        }}
      >
        click
      </button>
      <Dialog visible={x}>
        <div>我真的是太倒霉了</div>
      </Dialog>
    </>
  );
};

export default DialogExample;
