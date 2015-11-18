import assert from "power-assert";
import createTestObjects from "./utils/createTestObjects";
import MaxPrintObject from "../../../src/objects/max/MaxPrintObject";
import { $i, $s } from "../../../src/TypedValue";

describe("MaxPrintObject", () => {
  describe("[ print ]", () => {
    const opts = {
      "numOfInlets": 1,
      "numOfOutlets": 0,
      "outletTypes": [],
      "args": [],
      "attrs": {}
    };
    describe("/:else", () => {
      it("Messages are not interpreted by the print object. They are simply printed verbatim in the Max Console", () => {
        let { patcher, sender, receiverSpy } = createTestObjects(MaxPrintObject, opts);

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
    describe("/:else", () => {
      it("Messages are not interpreted by the print object. They are simply printed verbatim in the Max Console", () => {
        let { patcher, sender, receiverSpy } = createTestObjects(MaxPrintObject, opts);

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
