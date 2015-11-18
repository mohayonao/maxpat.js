import assert from "power-assert";
import createTestObjects from "./utils/createTestObjects";
import MaxIntObject from "../../../src/objects/max/MaxIntObject";
import { $i, $f, $s } from "../../../src/TypedValue";

describe("MaxIntObject", () => {
  describe("[ int ]", () => {
    const opts = {
      "numOfInlets": 2,
      "numOfOutlets": 1,
      "outletTypes": [ "int" ],
      "args": [],
      "attrs": {}
    };
    describe("/bang", () => {
      it("In left inlet: Sends the stored value out the outlet", () => {
        let { sender, receiverSpy } = createTestObjects(MaxIntObject, opts);

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(0) ]);
      });
    });
  });
  describe("[ int 74 ]", () => {
    const opts = {
      "numOfInlets": 2,
      "numOfOutlets": 1,
      "outletTypes": [ "int" ],
      "args": [ $i(74) ],
      "attrs": {}
    };
    describe("/bang", () => {
      it("In left inlet: Sends the stored value out the outlet", () => {
        let { sender, receiverSpy } = createTestObjects(MaxIntObject, opts);

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(74) ]);
      });
    });
    describe("/int", () => {
      it("In left inlet: The number replaces the currently stored value and is sent out the outlet", () => {
        let { sender, receiverSpy } = createTestObjects(MaxIntObject, opts);

        sender.sendMessage(0, $i(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
      });
      it("In right inlet: The number replaces the stored value without triggering output", () => {
        let { sender, receiverSpy } = createTestObjects(MaxIntObject, opts);

        sender.sendMessage(1, $i(10));
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
      });
    });
    describe("/float", () => {
      it("In left inlet: Converted to int", () => {
        let { sender, receiverSpy } = createTestObjects(MaxIntObject, opts);

        sender.sendMessage(0, $f(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0][1], $i(10));
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
      });
      it("In right inlet: Converted to int", () => {
        let { sender, receiverSpy } = createTestObjects(MaxIntObject, opts);

        sender.sendMessage(1, $f(10));
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
      });
    });
    describe("/send", () => {
      it("In left inlet: The word send, followed by the name of a receive object, sends the value stored in int to all receive objects with that name, without sending it out the outlet of the int", () => {
        let { patcher, sender, receiverSpy } = createTestObjects(MaxIntObject, opts);

        sender.sendMessage(0, [ $s("send"), $s("goom") ]);
        assert(receiverSpy.callCount === 0);
        assert(patcher.sendMessage.callCount === 1);
        assert.deepEqual(patcher.sendMessage.args[0], [ "goom", $i(74) ]);
      });
    });
    describe("/set 10", () => {
      it("In left inlet: The word set , followed by a number, replaces the stored value without triggering output", () => {
        let { sender, receiverSpy } = createTestObjects(MaxIntObject, opts);

        sender.sendMessage(0, [ $s("set"), $i(10) ]);
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
      });
    });
  });
});
