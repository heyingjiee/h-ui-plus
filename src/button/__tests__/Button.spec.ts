import TSXButton from "../index";

import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

//分组
describe("Button分组", () => {
  //测试用例
  test("加载TSX组件，对比组件文本", () => {
    const wrapper = shallowMount(TSXButton);

    expect(wrapper.text()).toBe("TSX测试");
  });
});
