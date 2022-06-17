import {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
} from "react";
import { scopedClassMaker } from "../../util/classes";
import "./layout.less";
const scopedClass = scopedClassMaker("beyond-layout");

interface props extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}
const Content: FunctionComponent<props> = (props) => {
  const { className,...rest } = props;
  return (
    <div className={[scopedClass('content'), className].join(" ")} {...rest}>
      {props.children}
    </div>
  );
};

export default Content;
