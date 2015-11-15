import assert from "power-assert";
import toString from "../../src/utils/toString";
import TypedValue from "../../src/TypedValue";

describe("utils", () => {
  describe("toString(value: any): string", () => {
    it("works", () => {
      assert(toString(10) === "10");
      assert(toString(null) === "null");
      assert(toString("nan") === "nan");
      assert(toString(new TypedValue("int", 10)) === "10");
      assert(toString(new TypedValue("float", 10)) === "10.0");
      assert(toString(new TypedValue("string", "bang")) === "bang");
    });
  });
});
