import { useState } from "react";
import Dialog, { alert, comfirm, modal } from "../components/Dialog/Dialog";

const DialogExample = () => {
  const [x, setX] = useState(false);
  const openModal = () => {
    const close = modal(
      <h1>
        你好呀<button onClick={()=>{close()}}>close</button>
      </h1>
    );
  };
  return (
    <>
      <button
        onClick={() => {
          setX(!x);
        }}
      >
        click
      </button>
      <button
        onClick={() => {
          alert("123");
        }}
      >
        alert
      </button>
      <button
        onClick={() => {
          comfirm(
            "afasfasfas",
            () => {
              console.log("你点击了yes");
            },
            () => {
              console.log("你点击了no");
            }
          );
        }}
      >
        comfirm
      </button>
      <button
        onClick={openModal}
      >
        modal
      </button>
      <Dialog
        visible={x}
        buttons={[
          <button
            onClick={() => {
              setX(false);
            }}
          >
            ok
          </button>,
          <button
            onClick={() => {
              setX(false);
            }}
          >
            cancel
          </button>,
        ]}
        onclose={() => {
          setX(false);
        }}
      >
        <div>哈哈哈，每天都要开心</div>
      </Dialog>
    </>
  );
};

export default DialogExample;
