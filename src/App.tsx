import React from "react";
import Icon from "./components/Icon/icon";
import NewCom from './newCom'
const fn: React.MouseEventHandler = (e) => {
  console.log(e.target);
};
const obj = [
  {
    name: "FengYiMing",
    family: {
      mother: "ma",
      father: "ba",
    },
  },
  {
    name: "changXuanJie",
    family: {
      mother: "mama",
      father: "baba",
    },
  },
];
for (const {
  name: n,
  family: { mother: M, father: F },
} of obj) {
  console.log(`我的名字叫${n},我的爸爸叫${F},我的妈妈叫${M}`);
}
interface createConfig {
  width?: number;
  color?: string;
  [propName: string]: any;
}

const fun4 = (config: createConfig) => {
  console.log(config);
};
let whiteBox = { height: 12, color: "#fff" };
fun4(whiteBox);

const prop: { [key: string]: Array<number | string> } = {};
prop[1] = [1, "23"];
console.log(prop, "prop1111111");
const args = [8, 5] as const;
// const args: number[]
const angle = Math.atan2(...args); // error! Expected 2 arguments, but got 0 or more.
console.log(angle);
const obj1 = {
  name: "feng",
  age: 12,
  fun: function () {
    return () => {
      console.log(this.name);
    };
  },
};
let obj2 = obj1.fun();
obj2();

function fun3<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

interface person {
  name: string;
  age: number;
}
let personProps: keyof person;

function aa<type>(arg: type): type {
  return arg;
}
interface interType<type> {
  <type>(arg:type):type
}

function App(): JSX.Element {
  return (
    <>
      <Icon
        name="wechat"
        title="123"
        onClick={fn}
        onMouseEnter={() => {
          console.log("enter");
        }}
      />
      <NewCom />
    </>
  );
}

export default App;
