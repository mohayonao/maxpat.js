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

    describe("basic action", () => {
      let { sender, receiverSpy } = createTestObjects(MaxFloatObject, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("bang -> 0.0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(0) ]);
      });
      it("10 -> 10.0", () => {
        sender.sendMessage(0, $i(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10) ]);
      });
      it("bang -> 10.0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10) ]);
      });
      it("20.0 -> 20.0", () => {
        sender.sendMessage(0, $f(20));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(20) ]);
      });
      it("bang -> 20.0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(20) ]);
      });
      it("set 30.0 -> NO OUTPUT", () => {
        sender.sendMessage(0, [ $s("set"), $f(30) ]);
        assert(receiverSpy.callCount === 0);
      });
      it("bang -> 30.0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(30) ]);
      });
      it("40.0 left-> NO OUTPUT", () => {
        sender.sendMessage(1, [ $f(40) ]);
        assert(receiverSpy.callCount === 0);
      });
      it("bang -> 40.0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(40) ]);
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
    describe("basic action", () => {
      let { sender, receiverSpy } = createTestObjects(MaxFloatObject, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("In left inlet: Sends the stored value out the outlet", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(7.4) ]);
      });
    });
    describe("send action", () => {
      let { patcher, sender, receiverSpy } = createTestObjects(MaxFloatObject, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("send goom -> NO OUTPUT", () => {
        sender.sendMessage(0, [ $s("send"), $s("goom") ]);
        assert(receiverSpy.callCount === 0);
        assert(patcher.sendMessage.callCount === 1);
        assert.deepEqual(patcher.sendMessage.args[0], [ "goom", $f(7.4) ]);
      });
    });
  });
});
