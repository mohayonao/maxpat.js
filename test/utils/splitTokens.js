import assert from "power-assert";
import splitTokens from "../../src/utils/splitTokens";

describe("utils", () => {
  describe("splitTokens(str: string): string[]", () => {
    it("works", () => {
      assert.deepEqual(splitTokens(), []);
    });
    it("works: ''", () => {
      assert.deepEqual(splitTokens(""), []);
    });
    it("works:   \\n\\t", () => {
      assert.deepEqual(splitTokens("  \n\t"), []);
    });
    it("works: bang", () => {
      assert.deepEqual(splitTokens("bang"), [ "bang" ]);
    });
    it("works: print received @popup 1", () => {
      assert.deepEqual(splitTokens("print received @popup 1"), [ "print", "received", "@popup", "1" ]);
    });
    it("works: jit.movie 320 240", () => {
      assert.deepEqual(splitTokens("jit.movie 320 240"), [ "jit.movie", "320", "240" ]);
    });
    it("works: ;\\nhelpMsg help me", () => {
      assert.deepEqual(splitTokens(";\nhelpMsg help me"), [ ";", "helpMsg", "help", "me" ]);
    });
    it('works: "1 2 3"', () => {
      assert.deepEqual(splitTokens('"1 2 3"'), [ '"1 2 3"' ]);
    });
  });
});
