import {
  cloneElement,
  FunctionComponent,
  MouseEventHandler,
  ReactElement,
  ReactFragment,
  ReactNode,
} from "react";
import Icon from "../Icon/icon";
import { scopedClassMaker } from "../../util/classes";
import "./dialog.less";
import ReactDom from "react-dom";
interface props {
  visible: boolean;
  children: ReactNode;
  buttons?: ReactElement[];
  onclose: MouseEventHandler;
  maskClosable?: boolean;
}

const scopedClass = scopedClassMaker("beyond-dialog");

const Dialog: FunctionComponent<props> = (props) => {
  const onclickClose: MouseEventHandler = (e) => {
    props.onclose(e);
  };
  const onclickMaskClose: MouseEventHandler = (e) => {
    if (props.maskClosable) {
      props.onclose(e);
    }
  };
  const dialogDom = props.visible ? (
    <>
      <div className={scopedClass("mask")} onClick={onclickMaskClose}></div>
      <div className={scopedClass()}>
        <div className={scopedClass("close")} onClick={onclickClose}>
          <Icon name="close" />
        </div>
        <header className={scopedClass("header")}>标题</header>
        <main className={scopedClass("main")}>{props.children} </main>
        {props.buttons && props.buttons.length > 0 && (
          <footer className={scopedClass("footer")}>
            {props.buttons &&
              props.buttons.map((button, index) => {
                return cloneElement(button, { key: index });
              })}
          </footer>
        )}
      </div>
    </>
  ) : null;
  // 传送门  使dialogDom传送到body，使层级在最外层
  return ReactDom.createPortal(dialogDom, document.body);
};
Dialog.defaultProps = {
  maskClosable: false,
};
const alert = (content: string) => {
  const aa = () => {
    console.log("点击了关闭");
  };
  modal(content, [], aa);
};
const comfirm = (content: string, yes?: () => void, no?: () => void) => {
  const onYes = () => {
    close();
    yes && yes();
  };
  const onNo = () => {
    close();
    no && no();
  };
  const close = modal(content, [
    <button onClick={onYes}>yes</button>,
    <button onClick={onNo}>no</button>,
  ],onNo);
};
const modal = (
  content: ReactNode | ReactFragment,
  buttons?: Array<ReactElement>,
  beforeClose?: () => void
) => {
  const close = () => {
    ReactDom.render(cloneElement(component, { visible: false }), div);
    ReactDom.unmountComponentAtNode(div);
    div.remove();
  };
  const component = (
    <Dialog
      visible={true}
      onclose={() => {
        close();
        beforeClose && beforeClose();
      }}
      buttons={buttons}
    >
      {content}
    </Dialog>
  );
  const div = document.createElement("div");
  document.body.append(div);
  ReactDom.render(component, div);
  return close;
};
export { alert, comfirm, modal };
export default Dialog;
