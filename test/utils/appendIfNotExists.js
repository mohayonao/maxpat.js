import assert from "power-assert";
import appendIfNotExists from "../../src/utils/appendIfNotExists";

describe("utils", () => {
  describe("appendIfNotExists(array: any[], target: any): boolean", () => {
    it("works", () => {
      let array = [ 1, 2, 3, 4, 5 ];

      assert(appendIfNotExists(array, 6) === true);
      assert.deepEqual(array, [ 1, 2, 3, 4, 5, 6 ]);

      assert(appendIfNotExists(array, 3) === false);
      assert.deepEqual(array, [ 1, 2, 3, 4, 5, 6 ]);
    });
  });
});
