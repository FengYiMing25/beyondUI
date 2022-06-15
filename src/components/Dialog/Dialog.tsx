import { FunctionComponent, ReactNode } from "react";
import Icon from "../Icon/icon";
import { scopedClassMaker } from "../../util/classes";
import "./dialog.less";

interface props {
  visible: boolean;
  children: ReactNode;
}

const scopedClass = scopedClassMaker("beyond-dialog");

const Dialog: FunctionComponent<props> = (props) => {
  return props.visible ? (
    <>
      <div className={scopedClass("mask")}></div>
      <div className={scopedClass()}>
        <Icon name="close" className={scopedClass("close")}/>
        <header className={scopedClass("header")}>标题</header>
        <main className={scopedClass('main')}>{props.children} </main>
        <footer className={scopedClass('footer')}>
          <button>ok</button>
          <button>cancel</button>
        </footer>
      </div>
    </>
  ) : null;
};
export default Dialog;
