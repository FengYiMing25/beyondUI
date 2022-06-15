import Icon from "../components/Icon/icon";
const fn: React.MouseEventHandler = (e) => {
  console.log(e.target);
};

const IconExample = () => {
  return (
    <Icon
      name="wechat"
      title="123"
      onClick={fn}
      onMouseEnter={() => {
        console.log("enter");
      }}
    />
  );
};
export default IconExample