import React from "react";
import DialogExample from "./example/Dialog.example";
import IconExample from "./example/Icon.example";
import ButtonExample from "./example/Button.example";
import "./App.less"
import LayoutExample from "./example/Layout.example";


function App(): JSX.Element {
  return (
    <>
      <IconExample />
      <DialogExample />
      <ButtonExample />
      <LayoutExample />
    </>
  );
}

export default App;
