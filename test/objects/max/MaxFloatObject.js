import assert from "power-assert";
import createTestObjects from "./utils/createTestObjects";
import MaxFloatObject from "../../../src/objects/max/MaxFloatObject";
import { $i, $f, $s } from "../../../src/TypedValue";

describe("MaxFloatObject", () => {
  describe("[ float ]", () => {
    const opts = {
      "numOfInlets": 2,
      "numOfOutlets": 1,
      "outletTypes": [ "float" ],
      "args": [],
      "attrs": {}
    };
    describe("/bang", () => {
      it("In left inlet: Sends the stored value out the outlet", () => {
        let { sender, receiverSpy } = createTestObjects(MaxFloatObject, opts);

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(0) ]);
      });
    });
  });
  describe("[ float 7.4 ]", () => {
    const opts = {
      "numOfInlets": 2,
      "numOfOutlets": 1,
      "outletTypes": [ "float" ],
      "args": [ $f(7.4) ],
      "attrs": {}
    };
    describe("/bang", () => {
      it("In left inlet: Sends the stored value out the outlet", () => {
        let { sender, receiverSpy } = createTestObjects(MaxFloatObject, opts);

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(7.4) ]);
      });
    });
    describe("/int", () => {
      it("In left inlet: Converted to float", () => {
        let { sender, receiverSpy } = createTestObjects(MaxFloatObject, opts);

        sender.sendMessage(0, $i(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10) ]);
      });
      it("In right inlet: Converted to float", () => {
        let { sender, receiverSpy } = createTestObjects(MaxFloatObject, opts);

        sender.sendMessage(1, $i(10));
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10) ]);
      });
    });
    describe("/float", () => {
      it("In left inlet: The number replaces the currently stored value and is sent out the outlet", () => {
        let { sender, receiverSpy } = createTestObjects(MaxFloatObject, opts);

        sender.sendMessage(0, $f(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10) ]);
      });
      it("In right inlet: The number replaces the stored value without triggering output", () => {
        let { sender, receiverSpy } = createTestObjects(MaxFloatObject, opts);

        sender.sendMessage(1, $f(10));
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10) ]);
      });
    });
    describe("/send", () => {
      it("The word send, followed by a name of a receive object, sends the number stored in the float object to all receive objects with that name, without sending it out the float object's outlet", () => {
        let { patcher, sender, receiverSpy } = createTestObjects(MaxFloatObject, opts);

        sender.sendMessage(0, [ $s("send"), $s("goom") ]);
        assert(receiverSpy.callCount === 0);
        assert(patcher.sendMessage.callCount === 1);
        assert.deepEqual(patcher.sendMessage.args[0], [ "goom", $f(7.4) ]);
      });
    });
    describe("/set 10.", () => {
      it("In left inlet: The word set, followed by a number, replaces the stored value without triggering output", () => {
        let { sender, receiverSpy } = createTestObjects(MaxFloatObject, opts);

        sender.sendMessage(0, [ $s("set"), $f(10) ]);
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10) ]);
      });
    });
  });
});
