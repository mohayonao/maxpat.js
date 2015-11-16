import assert from "power-assert";
import toArray from "../../src/utils/toArray";

describe("utils", () => {
  describe("toArray(value: any): any[]", () => {
    it("works", () => {
      assert.deepEqual(toArray(10), [ 10 ]);
      assert.deepEqual(toArray(null), [ null ]);
      assert.deepEqual(toArray([ 1, 2, 3 ]), [ 1, 2, 3 ]);
    });
  });
});
