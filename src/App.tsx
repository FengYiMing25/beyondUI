import React from "react";
import Icon from "./components/Icon/icon";
const fn: React.MouseEventHandler = (e) => {
  console.log(e.target);
};
function App() {
  return (
    <>
      <Icon
        name="happy"
        title="123"
        onClick={fn}
        onMouseEnter={() => {
          console.log("enter");
        }}
      />
    </>
  );
}

export default App;
