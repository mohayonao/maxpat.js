import assert from "power-assert";
import parseText from "../../src/utils/parseText";

describe("utils", () => {
  describe("parseText(text: string): object", () => {
    it("works", () => {
      assert.deepEqual(parseText(), {
        tagName: "", args: [], attrs: {}
      });
    });
    it("works: ''", () => {
      assert.deepEqual(parseText(""), {
        tagName: "", args: [], attrs: {}
      });
    });
    it("works: dac~", () => {
      assert.deepEqual(parseText("dac~"), {
        tagName: "dac~",
        args: [],
        attrs: {}
      });
    });
    it("works: cycle~ 1000", () => {
      assert.deepEqual(parseText("cycle~ 1000"), {
        tagName: "cycle~",
        args: [ { type: "int", value: 1000 } ],
        attrs: {}
      });
    });
    it("works: cycle~ @frequency", () => {
      assert.deepEqual(parseText("cycle~ @frequency"), {
        tagName: "cycle~",
        args: [],
        attrs: {
          frequency: []
        }
      });
    });
    it("works: jit.brcosa @brightness 0.5 @contrast 2. @saturation 0.7", () => {
      assert.deepEqual(parseText("jit.brcosa @brightness 0.5 @contrast 2. @saturation 0.7"), {
        tagName: "jit.brcosa",
        args: [],
        attrs: {
          brightness: [ { type: "float", value: 0.5 } ],
          contrast: [ { type: "float", value: 2.0 } ],
          saturation: [ { type: "float", value: 0.7 } ]
        }
      });
    });
    it("works: jit.matrix 4 char 320 240 @planemap 0 3 2 1", () => {
      assert.deepEqual(parseText("jit.matrix 4 char 320 240 @planemap 0 3 2 1"), {
        tagName: "jit.matrix",
        args: [
          { type: "int", value: 4 },
          { type: "string", value: "char" },
          { type: "int", value: 320 },
          { type: "int", value: 240 }
        ],
        attrs: {
          "planemap": [
            { type: "int", value: 0 },
            { type: "int", value: 3 },
            { type: "int", value: 2 },
            { type: "int", value: 1 }
          ]
        }
      });
    });
  });
});
