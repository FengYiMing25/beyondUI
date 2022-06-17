import {
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import { scopedClassMaker } from "../../util/classes";
import Aside from "./aside";
import "./layout.less";
const scopedClass = scopedClassMaker("beyond-layout");

interface props extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}
const Layout: FunctionComponent<props> = (props) => {
  console.log(props.children);
  let hasAside = false;
  if ((props.children as Array<ReactElement>).length) {
    (props.children as Array<ReactElement>).map((node) => {
      console.log(node.type);
      if (node.type === Aside) {
        hasAside = true;
      }
    });
  }
  const { className, ...rest } = props;
  return (
    <div
      className={[scopedClass(), className, hasAside && "hasAside"].filter(Boolean).join(" ")}
      {...rest}
    >
      {props.children}
    </div>
  );
};

export default Layout;
