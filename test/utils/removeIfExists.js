import assert from "power-assert";
import removeIfExists from "../../src/utils/removeIfExists";

describe("utils", () => {
  describe("removeIfExists(array: any[], target: any): boolean", () => {
    it("works", () => {
      let array = [ 1, 2, 3, 4, 5 ];

      assert(removeIfExists(array, 3) === true);
      assert.deepEqual(array, [ 1, 2, 4, 5 ]);

      assert(removeIfExists(array, 6) === false);
      assert.deepEqual(array, [ 1, 2, 4, 5 ]);
    });
  });
});
