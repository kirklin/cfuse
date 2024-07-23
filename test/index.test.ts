import { describe, expect, it } from "vitest";
import cfuse from "../src";

describe("cfuse function tests", () => {
  // 测试 cfuse 函数是否正确导出
  it("should export a function", () => {
    expect(typeof cfuse).toBe("function");
  });

  describe("handling strings", () => {
    // 测试处理空字符串
    it("should handle empty string", () => {
      expect(cfuse("")).toBe("");
    });

    // 测试处理单个字符串
    it("should handle single string", () => {
      expect(cfuse("hello")).toBe("hello");
    });

    // 测试处理条件字符串
    it("should handle conditional strings", () => {
      expect(cfuse(true && "hello")).toBe("hello");
      expect(cfuse(false && "hello")).toBe("");
    });

    // 测试处理多个字符串
    it("should handle multiple strings", () => {
      expect(cfuse("hello", "world")).toBe("hello world");
      expect(cfuse(true && "hello", false && "world", "everyone")).toBe("hello everyone");
      expect(cfuse(false && "hello", "world", "everyone", "")).toBe("world everyone");
    });
  });

  describe("handling numbers", () => {
    // 测试处理单个数字
    it("should handle single number", () => {
      expect(cfuse(1)).toBe("1");
      expect(cfuse(42)).toBe("42");
      expect(cfuse(0.75)).toBe("0.75");
      expect(cfuse(0)).toBe(""); // 0 是 falsy 值，因此不包含在结果中
    });

    // 测试处理特殊数字
    it("should handle special numbers", () => {
      expect(cfuse(Infinity)).toBe("Infinity");
      expect(cfuse(Number.NaN)).toBe(""); // NaN 是 falsy 值，因此不包含在结果中
    });

    // 测试处理多个数字
    it("should handle multiple numbers", () => {
      expect(cfuse(0, 1)).toBe("1");
      expect(cfuse(5, 10)).toBe("5 10");
    });
  });

  describe("handling objects", () => {
    // 测试处理空对象
    it("should handle empty object", () => {
      expect(cfuse({})).toBe("");
    });

    // 测试处理单个对象
    it("should handle single object", () => {
      expect(cfuse({ active: true })).toBe("active");
      expect(cfuse({ active: true, inactive: false })).toBe("active");
      expect(cfuse({ title: "Welcome", count: 10 })).toBe("title count");
      expect(cfuse({ primary: 1, secondary: 0, tertiary: 2 })).toBe("primary tertiary");
      expect(cfuse({ "main-item": 1, "sub-item": 1 })).toBe("main-item sub-item");
    });

    // 测试处理多个对象
    it("should handle multiple objects", () => {
      expect(cfuse({}, {})).toBe("");
      expect(cfuse({ primary: 1 }, { secondary: 2 })).toBe("primary secondary");
      expect(cfuse({ enabled: true }, null, { visible: true, hidden: false })).toBe("enabled visible");
      expect(cfuse({ base: 1 }, {}, {}, { tag: "special" }, { filter: null, limit: Infinity })).toBe("base tag limit");
    });
  });

  describe("handling arrays", () => {
    // 测试处理空数组
    it("should handle empty array", () => {
      expect(cfuse([])).toBe("");
    });

    // 测试处理单个数组
    it("should handle single array", () => {
      expect(cfuse(["item1"])).toBe("item1");
      expect(cfuse(["item1", "item2"])).toBe("item1 item2");
      expect(cfuse(["item1", 0 && "item2", 1 && "item3"])).toBe("item1 item3");
    });

    // 测试处理嵌套数组
    it("should handle nested arrays", () => {
      expect(cfuse([[[]]])).toBe("");
      expect(cfuse([[["item1"]]])).toBe("item1");
      expect(cfuse([true, [["item2"]]])).toBe("item2");
      expect(cfuse(["item1", ["item2", ["", [["item3"]]]]])).toBe("item1 item2 item3");
    });

    // 测试处理多个数组
    it("should handle multiple arrays", () => {
      expect(cfuse([], [])).toBe("");
      expect(cfuse(["item1"], ["item2"])).toBe("item1 item2");
      expect(cfuse(["item1"], null, ["item3", ""], true, "", [])).toBe("item1 item3");
    });
  });

  describe("handling mixed inputs", () => {
    // 测试处理异构参数（不同类型的混合输入）
    it("should handle heterogeneous arguments", () => {
      expect(cfuse({ active: true }, "status", 0)).toBe("active status");
      expect(cfuse("begin", ["middle", { end: true, unused: false }], "finish")).toBe("begin middle end finish");
    });
  });

  describe("edge cases", () => {
    // 测试处理函数
    it("should handle functions", () => {
      const noop = () => {};
      expect(cfuse(noop, "text")).toBe("text");
      expect(cfuse(noop, "text", cfuse)).toBe("text");
      expect(cfuse(noop, "text", [[cfuse], "more"])).toBe("text more");
    });

    // 测试处理所有类型的真值和假值属性值
    it("should handle all types of truthy and falsy property values", () => {
      const result = cfuse({
        // 假值:
        nullValue: null,
        emptyString: "",
        invalidNumber: Number.NaN,
        zeroValue: 0,
        negativeZeroValue: -0,
        falseValue: false,
        undefinedValue: undefined,

        // 真值:
        nonEmptyString: "content",
        whitespaceString: " ",
        functionValue: Object.prototype.toString,
        emptyObject: {},
        nonEmptyObject: { a: 1, b: 2 },
        emptyList: [],
        nonEmptyList: [1, 2, 3],
        positiveNumber: 1,
      });

      expect(result).toBe("nonEmptyString whitespaceString functionValue emptyObject nonEmptyObject emptyList nonEmptyList positiveNumber");
    });
  });
});
