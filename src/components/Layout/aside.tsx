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
const Aside: FunctionComponent<props> = (props) => {
  const { className,...rest } = props;
  return (
    <div className={[scopedClass('aside'), className].join(" ")} {...rest}>
      {props.children}
    </div>
  );
};

export default Aside;
