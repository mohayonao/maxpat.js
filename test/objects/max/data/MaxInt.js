import assert from "power-assert";
import createTestObjects from "../utils/createTestObjects";
import MaxInt from "../../../../src/objects/max/data/MaxInt";
import { $i, $f, $s } from "../../../../src/TypedValue";

describe("MaxInt", () => {
  describe("[ int ]", () => {
    const opts = {
      "numOfInlets": 2,
      "numOfOutlets": 1,
      "outletTypes": [ "int" ],
      "args": [],
      "attrs": {}
    };
    describe("basic action", () => {
      let { sender, receiverSpy } = createTestObjects(MaxInt, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("bang -> 0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(0) ]);
      });
      it("10 -> 10", () => {
        sender.sendMessage(0, $i(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
      });
      it("bang -> 10", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
      });
      it("20.0 -> 20", () => {
        sender.sendMessage(0, $f(20));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(20) ]);
      });
      it("bang -> 20", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(20) ]);
      });
      it("set 30 -> NO OUTPUT", () => {
        sender.sendMessage(0, [ $s("set"), $i(30) ]);
        assert(receiverSpy.callCount === 0);
      });
      it("bang -> 30", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(30) ]);
      });
      it("40 left-> NO OUTPUT", () => {
        sender.sendMessage(1, [ $i(40) ]);
        assert(receiverSpy.callCount === 0);
      });
      it("bang -> 40", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(40) ]);
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
    describe("basic action", () => {
      let { sender, receiverSpy } = createTestObjects(MaxInt, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("In left inlet: Sends the stored value out the outlet", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(74) ]);
      });
    });
    describe("send action", () => {
      let { patcher, sender, receiverSpy } = createTestObjects(MaxInt, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("send goom -> NO OUTPUT", () => {
        sender.sendMessage(0, [ $s("send"), $s("goom") ]);
        assert(receiverSpy.callCount === 0);
        assert(patcher.sendMessage.callCount === 1);
        assert.deepEqual(patcher.sendMessage.args[0], [ "goom", $i(74) ]);
      });
    });
  });
});
