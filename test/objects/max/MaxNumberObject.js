import assert from "power-assert";
import createTestObjects from "./utils/createTestObjects";
import MaxNumberObject from "../../../src/objects/max/MaxNumberObject";
import { $i, $f, $s } from "../../../src/TypedValue";

describe("MaxNumberObject", () => {
  describe("[> 0 ]", () => {
    const opts = {
      "numOfInlets": 1,
      "numOfOutlets": 2,
      "outletTypes": [ "", "bang" ],
      "args": [],
      "attrs": {}
    };
    describe("basic action", () => {
      let { sender, receiverSpy } = createTestObjects(MaxNumberObject, opts);

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
    });
    describe("min/max action", () => {
      let { sender, receiverSpy } = createTestObjects(MaxNumberObject, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("90 -> 90", () => {
        sender.sendMessage(0, $i(90));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(90) ]);
      });
      it("max 70 => NO OUTPUT", () => {
        sender.sendMessage(0, [ $s("max"), $i(70) ]);
        assert(receiverSpy.callCount === 0);
      });
      it("bang -> 70", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(70) ]);
      });
      it("80 -> 70", () => {
        sender.sendMessage(0, $i(80));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(70) ]);
      });
      it("10 -> 10", () => {
        sender.sendMessage(0, $i(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
      });
      it("min 30 -> NOT OUTPUT", () => {
        sender.sendMessage(0, [ $s("min"), $i(30) ]);
        assert(receiverSpy.callCount === 0);
      });
      it("bang -> 30", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(30) ]);
      });
      it("20 -> 30", () => {
        sender.sendMessage(0, $i(20));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(30) ]);
      });
    });
  });
});
