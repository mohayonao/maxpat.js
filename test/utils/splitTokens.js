import assert from "power-assert";
import splitTokens from "../../src/utils/splitTokens";

describe("utils", () => {
  describe("splitTokens(str: string): string[]", () => {
    it("works", () => {
      assert.deepEqual(splitTokens(), []);
      assert.deepEqual(splitTokens(""), []);
      assert.deepEqual(splitTokens("  \n\t"), []);
      assert.deepEqual(splitTokens("bang"), [ "bang" ]);
      assert.deepEqual(splitTokens("print received @popup 1"), [ "print", "received", "@popup", "1" ]);
      assert.deepEqual(splitTokens("jit.movie 320 240"), [ "jit.movie", "320", "240" ]);
      assert.deepEqual(splitTokens(";\nhelpMsg help me"), [ ";", "helpMsg", "help", "me" ]);
      assert.deepEqual(splitTokens('"1 2 3"'), [ '"1 2 3"' ]);
    });
  });
});
