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
        <div>哈哈哈，每天都要开心</div>
      </Dialog>
    </>
  );
};

export default DialogExample;
