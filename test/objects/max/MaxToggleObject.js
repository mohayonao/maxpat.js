import assert from "power-assert";
import createTestObjects from "./utils/createTestObjects";
import MaxToggleObject from "../../../src/objects/max/MaxToggleObject";
import { $i, $f, $s } from "../../../src/TypedValue";

describe("MaxIntObject", () => {
  describe("[ toggle ]", () => {
    const opts = {
      "numOfInlets": 1,
      "numOfOutlets": 1,
      "outletTypes": [ "int" ],
      "args": [],
      "attrs": {}
    };
    describe("basic action", () => {
      let { sender, receiverSpy } = createTestObjects(MaxToggleObject, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("bang -> 1", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(1) ]);
      });
      it("bang -> 0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(0) ]);
      });
      it("bang -> 1", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(1) ]);
      });
      it("bang -> 0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(0) ]);
      });
    });
    describe("action with not bang", () => {
      let { sender, receiverSpy } = createTestObjects(MaxToggleObject, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("10 -> 10", () => {
        sender.sendMessage(0, $i(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
      });
      it("bang -> 0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(0) ]);
      });
      it("10.0 -> 10", () => {
        sender.sendMessage(0, $f(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
      });
      it("bang -> 0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(0) ]);
      });
      it("[ 10.0 20.0 ] -> 10", () => {
        sender.sendMessage(0, [ $f(10), $f(20) ]);
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
      });
      it("bang -> 0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(0) ]);
      });
    });
    describe("set action", () => {
      let { sender, receiverSpy } = createTestObjects(MaxToggleObject, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("set 10 -> NO OUTPUT", () => {
        sender.sendMessage(0, [ $s("set"), $i(10) ]);
        assert(receiverSpy.callCount === 0);
      });
      it("bang -> 0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(0) ]);
      });
      it("set 10 -> NO OUTPUT", () => {
        sender.sendMessage(0, [ $s("set"), $i(10) ]);
        assert(receiverSpy.callCount === 0);
      });
      it("set 0 -> NO OUTPUT", () => {
        sender.sendMessage(0, [ $s("set"), $i(0) ]);
        assert(receiverSpy.callCount === 0);
      });
      it("bang -> 1", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(1) ]);
      });
    });
  });
});
