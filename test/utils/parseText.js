import assert from "power-assert";
import parseText from "../../src/utils/parseText";

describe("utils", () => {
  describe("parseText(text: string): object", () => {
    it("works", () => {
      assert.deepEqual(parseText(), {
        klassName: "", args: [], attrs: {}
      });
    });
    it("works: ''", () => {
      assert.deepEqual(parseText(""), {
        klassName: "", args: [], attrs: {}
      });
    });
    it("works: dac~", () => {
      assert.deepEqual(parseText("dac~"), {
        klassName: "dac~",
        args: [],
        attrs: {}
      });
    });
    it("works: cycle~ 1000", () => {
      assert.deepEqual(parseText("cycle~ 1000"), {
        klassName: "cycle~",
        args: [ { type: "int", value: 1000 } ],
        attrs: {}
      });
    });
    it("works: cycle~ @frequency", () => {
      assert.deepEqual(parseText("cycle~ @frequency"), {
        klassName: "cycle~",
        args: [],
        attrs: {
          frequency: { type: "float", value: 0 }
        }
      });
    });
    it("works: jit.brcosa @brightness 0.5 @contrast 2. @saturation 0.7", () => {
      assert.deepEqual(parseText("jit.brcosa @brightness 0.5 @contrast 2. @saturation 0.7"), {
        klassName: "jit.brcosa",
        args: [],
        attrs: {
          brightness: { type: "float", value: 0.5 },
          contrast: { type: "float", value: 2.0 },
          saturation: { type: "float", value: 0.7 }
        }
      });
    });
    it("works: jit.matrix 4 char 320 240 @planemap 0 3 2 1", () => {
      assert.deepEqual(parseText("jit.matrix 4 char 320 240 @planemap 0 3 2 1"), {
        klassName: "jit.matrix",
        args: [
          { type: "int", value: 4 },
          { type: "symbol", value: "char" },
          { type: "int", value: 320 },
          { type: "int", value: 240 }
        ],
        attrs: {
          "planemap": {
            type: "list",
            value: [
              { type: "int", value: 0 },
              { type: "int", value: 3 },
              { type: "int", value: 2 },
              { type: "int", value: 1 }
            ]
          }
        }
      });
    });
  });
});
