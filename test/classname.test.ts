import { describe, expect, it } from "vitest";
import cfuse from "../src/";

describe("cfuse function compatibility", () => {
  // 测试对象的键名，只有值为真值的键才会被包含在结果中
  it("keeps object keys with truthy values", () => {
    const result = cfuse({ a: true, b: false, c: 0, d: null, e: undefined, f: 1 });
    expect(result).toBe("a f");
  });

  // 测试将不同类型的类名数组与其他值合并，并忽略伪假值
  it("joins arrays of class names and ignores falsy values", () => {
    const result = cfuse("class1", 0, null, undefined, true, 1, "class2");
    expect(result).toBe("class1 1 class2");
  });

  // 测试混合类型的参数，包括对象和字符串
  it("supports heterogeneous arguments", () => {
    const result = cfuse({ active: true }, "base-class", 0);
    expect(result).toBe("active base-class");
  });

  // 测试结果中去除多余的空格
  it("trims the result", () => {
    const result = cfuse("", "main-class", {}, "");
    expect(result).toBe("main-class");
  });

  // 测试空配置返回空字符串
  it("returns an empty string for an empty configuration", () => {
    const result = cfuse({});
    expect(result).toBe("");
  });

  // 测试单一类名数组的支持
  it("supports an array of class names", () => {
    const result = cfuse(["header", "footer"]);
    expect(result).toBe("header footer");
  });

  // 测试数组参数和字符串参数的联合
  it("joins array arguments with string arguments", () => {
    const result1 = cfuse(["container", "button"], "primary");
    expect(result1).toBe("container button primary");

    const result2 = cfuse("primary", ["container", "button"]);
    expect(result2).toBe("primary container button");
  });

  // 测试多个数组参数
  it("handles multiple array arguments", () => {
    const result = cfuse(["nav", "link"], ["active", "highlight"]);
    expect(result).toBe("nav link active highlight");
  });

  // 测试包含伪假值和真值的数组
  it("handles arrays with falsy and true values", () => {
    const result = cfuse(["nav", 0, null, undefined, false, true, "button"]);
    expect(result).toBe("nav button");
  });

  // 测试包含嵌套数组的数组
  it("handles arrays that include nested arrays", () => {
    const result = cfuse(["container", ["header", "footer"]]);
    expect(result).toBe("container header footer");
  });

  // 测试包含对象的数组
  it("handles arrays that include objects", () => {
    const result = cfuse(["container", { active: true, hidden: false }]);
    expect(result).toBe("container active");
  });

  // 测试深层次的数组递归
  it("handles deep array recursion", () => {
    const result = cfuse(["nav", ["link", ["dropdown", { expanded: true }]]]);
    expect(result).toBe("nav link dropdown expanded");
  });

  // 测试空数组的处理
  it("handles arrays that are empty", () => {
    const result = cfuse("main", []);
    expect(result).toBe("main");
  });

  // 测试包含空嵌套数组的嵌套数组
  it("handles nested arrays with empty nested arrays", () => {
    const result = cfuse("main", [[]]);
    expect(result).toBe("main");
  });

  // 测试各种真值和假值属性值
  it("handles all types of truthy and falsy property values correctly", () => {
    const result = cfuse({
      // Falsy values:
      null: null,
      emptyString: "",
      noNumber: Number.NaN,
      zero: 0,
      negativeZero: -0,
      false: false,
      undefined,

      // Truthy values:
      nonEmptyString: "foobar",
      whitespace: " ",
      function: Object.prototype.toString,
      emptyObject: {},
      nonEmptyObject: { a: 1, b: 2 },
      emptyList: [],
      nonEmptyList: [1, 2, 3],
      greaterZero: 1,
    });

    expect(result).toBe("nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero");
  });
});
