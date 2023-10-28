import SFCButton from "../index";

import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

//分组
describe("Button分组", () => {
  //测试用例
  test("加载SFCButton组件,对比组件文本", () => {
    const wrapper = shallowMount(SFCButton);

    expect(wrapper.text()).toBe("SFC按钮文案");
  });
});
