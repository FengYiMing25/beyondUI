import * as TestRenderer from "react-test-renderer";
import React from "react";
import Icon from "./icon";
import {mount} from 'enzyme'
// 解决测试时候mount没有dom的情况
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM("");
const { document } = new JSDOM(``).window;
global.document = document;
global.window = window;

describe("icon", () => {
  // UI 测试
  it("UI 测试", () => {
    // 通过 toMatchSnapshot 形成一个快照来进行简单测试
    const json = TestRenderer.create(<Icon name="weChat" />).toJSON();
    expect(json).toMatchSnapshot();
  });
  // 点击事件测试
  it("测试点击事件", () => {
    const fn = jest.fn()  
    const fn2 = jest.fn()
    const component = mount(<Icon name="happy" onClick={fn} />);
    component.find("svg").simulate("click");
    expect(fn).toBeCalled()  //结果是fn被调用，fn2没有被调用
  });
});
