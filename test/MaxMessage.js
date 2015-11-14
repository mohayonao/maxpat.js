import assert from "power-assert";
import MaxMessage from "../src/MaxMessage";
import TypedValue from "../src/TypedValue";

function i(value) {
  return new TypedValue("int", value);
}

function f(value) {
  return new TypedValue("float", value);
}

function s(value) {
  return new TypedValue("string", value);
}

describe("MaxMessage", () => {
  describe("constructor(values: TypedValue[])", () => {
    it("works", () => {
      let msg = new MaxMessage([ i(1) ]);

      assert(msg instanceof MaxMessage);
    });
  });
  describe("#getType(): string", () => {
    it("works with int", () => {
      let msg = new MaxMessage([ i(1) ]);

      assert(msg.getType() === "int");
    });
    it("works with float", () => {
      let msg = new MaxMessage([ f(2) ]);

      assert(msg.getType() === "float");
    });
    it("works with list", () => {
      let msg = new MaxMessage([ i(1), f(2) ]);

      assert(msg.getType() === "list");
    });
    it("works with bang", () => {
      let msg = new MaxMessage([ s("bang") ]);

      assert(msg.getType() === "bang");
    });
    it("works with string", () => {
      let msg = new MaxMessage([ s("clear") ]);

      assert(msg.getType() === "clear");
    });
    it("works with string list", () => {
      let msg = new MaxMessage([ s("set"), i(100) ]);

      assert(msg.getType() === "set");
    });
  });
  describe("#getValues(): TypedValue[]", () => {
    it("works with int", () => {
      let msg = new MaxMessage([ i(1) ]);

      assert.deepEqual(msg.getValues(), [ i(1) ]);
    });
    it("works with float", () => {
      let msg = new MaxMessage([ f(2) ]);

      assert.deepEqual(msg.getValues(), [ f(2) ]);
    });
    it("works with list", () => {
      let msg = new MaxMessage([ i(1), f(2) ]);

      assert.deepEqual(msg.getValues(), [ i(1), f(2) ]);
    });
    it("works with bang", () => {
      let msg = new MaxMessage([ s("bang") ]);

      assert.deepEqual(msg.getValues(), []);
    });
    it("works with clear", () => {
      let msg = new MaxMessage([ s("clear") ]);

      assert.deepEqual(msg.getValues(), []);
    });
    it("works with string list", () => {
      let msg = new MaxMessage([ s("set"), i(100) ]);

      assert.deepEqual(msg.getValues(), [ i(100) ]);
    });
  });
  describe("#toString(): string", () => {
    it("works with int", () => {
      let msg = new MaxMessage([ i(1) ]);

      assert(msg.toString() === "1");
    });
    it("works with float", () => {
      let msg = new MaxMessage([ f(2) ]);

      assert(msg.toString() === "2.0");
    });
    it("works with list", () => {
      let msg = new MaxMessage([ i(1), f(2) ]);

      assert(msg.toString() === "[ 1, 2.0 ]");
    });
    it("works with bang", () => {
      let msg = new MaxMessage([ s("bang") ]);

      assert(msg.toString() === "bang");
    });
    it("works with string", () => {
      let msg = new MaxMessage([ s("clear") ]);

      assert(msg.toString() === "clear");
    });
    it("works with string list", () => {
      let msg = new MaxMessage([ s("set"), i(100) ]);

      assert(msg.toString() === "set 100");
    });
  });
  describe("#valueOf(): string", () => {
    it("works with int", () => {
      let msg = new MaxMessage([ i(1) ]);

      assert(msg.valueOf() === 1);
    });
    it("works with float", () => {
      let msg = new MaxMessage([ f(2) ]);

      assert(msg.valueOf() === 2);
    });
    it("works with list", () => {
      let msg = new MaxMessage([ i(1), f(2) ]);

      assert.deepEqual(msg.valueOf(), [ 1, 2 ]);
    });
    it("works with bang", () => {
      let msg = new MaxMessage([ s("bang") ]);

      assert(msg.valueOf() === "bang");
    });
    it("works with string", () => {
      let msg = new MaxMessage([ s("clear") ]);

      assert(msg.valueOf() === "clear");
    });
    it("works with string list", () => {
      let msg = new MaxMessage([ s("set"), i(100) ]);

      assert(msg.valueOf() === "set 100");
    });
  });
  describe("#toJSON(): string", () => {
    it("works with int", () => {
      let msg = new MaxMessage([ i(1) ]);

      assert.deepEqual(msg.toJSON(), {
        type: "int", values: [ { type: "int", value: 1 } ]
      });
    });
    it("works with float", () => {
      let msg = new MaxMessage([ f(2) ]);

      assert.deepEqual(msg.toJSON(), {
        type: "float", values: [ { type: "float", value: 2 } ]
      });
    });
    it("works with list", () => {
      let msg = new MaxMessage([ i(1), f(2) ]);

      assert.deepEqual(msg.toJSON(), {
        type: "list", values: [ { type: "int", value: 1 }, { type: "float", value: 2 } ]
      });
    });
    it("works with bang", () => {
      let msg = new MaxMessage([ s("bang") ]);

      assert.deepEqual(msg.toJSON(), {
        type: "bang", values: []
      });
    });
    it("works with string", () => {
      let msg = new MaxMessage([ s("clear") ]);

      assert.deepEqual(msg.toJSON(), {
        type: "clear", values: []
      });
    });
    it("works with string list", () => {
      let msg = new MaxMessage([ s("set"), i(100) ]);

      assert.deepEqual(msg.toJSON(), {
        type: "set", values: [ { type: "int", value: 100 } ]
      });
    });
  });
});
