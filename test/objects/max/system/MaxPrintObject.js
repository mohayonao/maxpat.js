import assert from "power-assert";
import createTestObjects from "../utils/createTestObjects";
import MaxPrintObject from "../../../../src/objects/max/system/MaxPrintObject";
import { $i, $s } from "../../../../src/TypedValue";

describe("MaxPrintObject", () => {
  describe("[ print ]", () => {
    const opts = {
      "numOfInlets": 1,
      "numOfOutlets": 0,
      "outletTypes": [],
      "args": [],
      "attrs": {}
    };
    describe("basci action", () => {
      let { patcher, sender, receiverSpy } = createTestObjects(MaxPrintObject, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("hello world -> NO OUTPUT", () => {
        sender.sendMessage(0, [ $s("hello"), $s("world") ]);
        assert(receiverSpy.callCount === 0);
        assert(patcher.emit.callCount === 1);
        assert.deepEqual(patcher.emit.args[0], [ "print", {
          id: "print", popup: 0, value: "hello world"
        } ]);
      });
    });
  });
  describe("[ print argument @popup 1 ]", () => {
    const opts = {
      "numOfInlets": 1,
      "numOfOutlets": 0,
      "outletTypes": [],
      "args": [ $s("argument") ],
      "attrs": {
        popup: [ $i(1) ]
      }
    };
    describe("basic action", () => {
      let { patcher, sender, receiverSpy } = createTestObjects(MaxPrintObject, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("hello world -> NO OUTPUT", () => {
        sender.sendMessage(0, [ $s("hello"), $s("world") ]);
        assert(receiverSpy.callCount === 0);
        assert(patcher.emit.callCount === 1);
        assert.deepEqual(patcher.emit.args[0], [ "print", {
          id: "argument", popup: 1, value: "hello world"
        } ]);
      });
    });
  });
});
