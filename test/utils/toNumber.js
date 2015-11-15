import assert from "power-assert";
import toNumber from "../../src/utils/toNumber";
import TypedValue from "../../src/TypedValue";

describe("utils", () => {
  describe("toNumber(value: any): number", () => {
    it("works", () => {
      assert(toNumber(10) === 10);
      assert(toNumber(null) === 0);
      assert(toNumber("nan") === 0);
      assert(toNumber(new TypedValue("int", 10)) === 10);
      assert(toNumber(new TypedValue("float", 10)) === 10);
      assert(toNumber(new TypedValue("string", "bang")) === 0);
    });
  });
});
