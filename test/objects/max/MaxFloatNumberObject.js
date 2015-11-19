import assert from "power-assert";
import createTestObjects from "./utils/createTestObjects";
import MaxFloatNumberObject from "../../../src/objects/max/MaxFloatNumberObject";
import { $i, $f, $s } from "../../../src/TypedValue";

describe("MaxFloatNumberObject", () => {
  describe("[> 0. ]", () => {
    const opts = {
      "numOfInlets": 1,
      "numOfOutlets": 2,
      "outletTypes": [ "", "bang" ],
      "args": [],
      "attrs": {}
    };
    describe("basic action", () => {
      let { sender, receiverSpy } = createTestObjects(MaxFloatNumberObject, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("bang -> 0.0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(0.0) ]);
      });
      it("10 -> 10.0", () => {
        sender.sendMessage(0, $i(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10.0) ]);
      });
      it("bang -> 10.0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10.0) ]);
      });
      it("20.0 -> 20.0", () => {
        sender.sendMessage(0, $f(20));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(20.0) ]);
      });
      it("bang -> 20.0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(20.0) ]);
      });
      it("set 30 -> NO OUTPUT", () => {
        sender.sendMessage(0, [ $s("set"), $i(30) ]);
        assert(receiverSpy.callCount === 0);
      });
      it("bang -> 30.0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(30.0) ]);
      });
    });
    describe("min/max action", () => {
      let { sender, receiverSpy } = createTestObjects(MaxFloatNumberObject, opts);

      afterEach(() => {
        receiverSpy.reset();
      });
      it("90.0 -> 90.0", () => {
        sender.sendMessage(0, $f(90));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(90) ]);
      });
      it("max 70.0 => NO OUTPUT", () => {
        sender.sendMessage(0, [ $s("max"), $f(70) ]);
        assert(receiverSpy.callCount === 0);
      });
      it("bang -> 70.0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(70) ]);
      });
      it("80.0 -> 70.0", () => {
        sender.sendMessage(0, $f(80));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(70) ]);
      });
      it("10.0 -> 10.0", () => {
        sender.sendMessage(0, $f(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10) ]);
      });
      it("min 30.0 -> NOT OUTPUT", () => {
        sender.sendMessage(0, [ $s("min"), $f(30) ]);
        assert(receiverSpy.callCount === 0);
      });
      it("bang -> 30.0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(30) ]);
      });
      it("20.0 -> 30.0", () => {
        sender.sendMessage(0, $f(20));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(30) ]);
      });
    });
  });
});
