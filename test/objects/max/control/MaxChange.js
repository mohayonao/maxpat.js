import assert from "power-assert";
import createTestObjects from "../utils/createTestObjects";
import MaxChange from "../../../../src/objects/max/control/MaxChange";
import { $i, $f, $s } from "../../../../src/TypedValue";

describe("MaxChange", () => {
  describe("[ change 0. ]", () => {
    const opts = {
      "numOfInlets": 1,
      "numOfOutlets": 3,
      "outletTypes": [ "", "int", "int" ],
      "args": [ $f(0) ],
      "attrs": {}
    };
    describe("basic action", () => {
      let { sender, receiverSpy } = createTestObjects(MaxChange, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("0 -> NO OUTPUT", () => {
        sender.sendMessage(0, $i(0));
        assert(receiverSpy.callCount === 0);
      });
      it("4 -> 4 / 1", () => {
        sender.sendMessage(0, $i(4));
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 1, $i(1) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $i(4) ]);
      });
      it("2 -> 2", () => {
        sender.sendMessage(0, $i(2));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(2) ]);
      });
      it("2.0 -> NO OUTPUT", () => {
        sender.sendMessage(0, $f(2.0));
        assert(receiverSpy.callCount === 0);
      });
      it("0.0 -> 0.0 / / 1", () => {
        sender.sendMessage(0, $f(0.0));
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 2, $i(1) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $f(0) ]);
      });
      it("set 4 -> NO OUTPUT", () => {
        sender.sendMessage(0, [ $s("set"), $i(4) ]);
        assert(receiverSpy.callCount === 0);
      });
      it("0 -> 0 / / 1", () => {
        sender.sendMessage(0, $i(0));
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 2, $i(1) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $i(0) ]);
      });
    });
    describe("action with mode +", () => {
      let { sender, receiverSpy } = createTestObjects(MaxChange, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("set + -> NO OUTPUT", () => {
        sender.sendMessage(0, [ $s("mode"), $s("+") ]);
        assert(receiverSpy.callCount === 0);
      });
      it("4 -> 1 / 1", () => {
        sender.sendMessage(0, $f(4));
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 1, $i(1) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $i(1) ]);
      });
      it("2 -> NO OUTPUT", () => {
        sender.sendMessage(0, $f(2));
        assert(receiverSpy.callCount === 0);
      });
      it("0 -> / / 1", () => {
        sender.sendMessage(0, $f(0));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 2, $i(1) ]);
      });
    });
    describe("action with mode -", () => {
      let { sender, receiverSpy } = createTestObjects(MaxChange, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("set - -> NO OUTPUT", () => {
        sender.sendMessage(0, [ $s("mode"), $s("-") ]);
        assert(receiverSpy.callCount === 0);
      });
      it("4 -> / 1", () => {
        sender.sendMessage(0, $f(4));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 1, $i(1) ]);
      });
      it("2 -> -1", () => {
        sender.sendMessage(0, $f(2));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(-1) ]);
      });
      it("0 -> -1 / 1", () => {
        sender.sendMessage(0, $f(0));
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 2, $i(1) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $i(-1) ]);
      });
    });
  });
});
