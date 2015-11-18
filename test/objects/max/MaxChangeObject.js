import assert from "power-assert";
import createTestObjects from "./utils/createTestObjects";
import MaxChangeObject from "../../../src/objects/max/MaxChangeObject";
import { $i, $f, $s } from "../../../src/TypedValue";

describe("MaxChangeObject", () => {
  describe("[ change 0. ]", () => {
    const opts = {
      "numOfInlets": 1,
      "numOfOutlets": 3,
      "outletTypes": [ "", "int", "int" ],
      "args": [ $f(0) ],
      "attrs": {}
    };
    describe("/int", () => {
      it("The number is sent out the outlet only if it is different from the currently stored value. Replaces the stored value", () => {
        let { sender, receiverSpy } = createTestObjects(MaxChangeObject, opts);

        sender.sendMessage(0, $i(0));
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $i(4));
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 1, $i(1) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $i(4) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $i(2));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(2) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $i(2));
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $i(0));
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 2, $i(1) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $i(0) ]);
      });
    });
    describe("/float", () => {
      it("Outputs the number only if it is different from the currently stored value. Replaces the stored value", () => {
        let { sender, receiverSpy } = createTestObjects(MaxChangeObject, opts);

        sender.sendMessage(0, $f(0));
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $f(4));
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 1, $i(1) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $f(4) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $f(2));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(2) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $f(2));
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $f(0));
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 2, $i(1) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $f(0) ]);
      });
    });
    describe("/list", () => {
      it("works", () => {
        let { sender, receiverSpy } = createTestObjects(MaxChangeObject, opts);

        sender.sendMessage(0, [ $f(0), $f(10) ]);
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, [ $f(4), $f(10) ]);
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 1, $i(1) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $f(4) ]);
        receiverSpy.reset();

        sender.sendMessage(0, [ $f(2), $f(10) ]);
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(2) ]);
        receiverSpy.reset();

        sender.sendMessage(0, [ $f(2), $f(10) ]);
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, [ $f(0), $f(10) ]);
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 2, $i(1) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $f(0) ]);
      });
    });
    describe("/set", () => {
      it("works", () => {
        let { sender, receiverSpy } = createTestObjects(MaxChangeObject, opts);

        sender.sendMessage(0, [ $s("set"), $i(0) ]);
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, [ $s("set"), $i(4) ]);
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, [ $s("set"), $i(2) ]);
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, [ $s("set"), $i(2) ]);
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $i(0));
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 2, $i(1) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $i(0) ]);
      });
    });
    describe("/mode +", () => {
      it("works", () => {
        let { sender, receiverSpy } = createTestObjects(MaxChangeObject, opts);

        sender.sendMessage(0, [ $s("mode"), $s("+") ]);

        sender.sendMessage(0, $f(0));
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $f(4));
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 1, $i(1) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $i(1) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $f(2));
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $f(2));
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $f(0));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 2, $i(1) ]);
      });
    });
    describe("/mode -", () => {
      it("works", () => {
        let { sender, receiverSpy } = createTestObjects(MaxChangeObject, opts);

        sender.sendMessage(0, [ $s("mode"), $s("-") ]);

        sender.sendMessage(0, $f(0));
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $f(4));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 1, $i(1) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $f(2));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(-1) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $f(2));
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $f(0));
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 2, $i(1) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $i(-1) ]);
      });
    });
  });
});
