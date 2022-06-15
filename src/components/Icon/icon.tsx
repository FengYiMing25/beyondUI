import React, { FunctionComponent } from "react";
import "../../../lib/load-svg.js";
import "./icon.less";
import classNames from "../../util/classNames";
// 当添加新的svg图片是需要重新运行一下  yarn dev
interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string;
  title?: string;
}
const Icon: FunctionComponent<IconProps> = ({
  className,
  name,
  ...otherProps
}) => {
  return (
    <div>
      <svg className={classNames(["icon", className])} {...otherProps}>
        <use xlinkHref={`#${name}`}></use>
      </svg>
    </div>
  );
};
export default Icon;
