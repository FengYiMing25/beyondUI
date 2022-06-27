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
  let hasAside = false;
  if ((props.children as Array<ReactElement>).length) {
    (props.children as Array<ReactElement>).map((node) => {
      if (node.type === Aside) {
        hasAside = true;
      }
    });
  }
  const { className, ...rest } = props;
  return (
    <div
      className={[scopedClass(), className, hasAside && scopedClass("hasAside")]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {props.children}
    </div>
  );
};

export default Layout;
export { Layout };
export { default as Header } from "./header";
export { default as Content } from "./content";
export { default as Aside } from "./aside";
export { default as Footer } from "./footer";
