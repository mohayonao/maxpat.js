import assert from "power-assert";
import sinon from "sinon";
import createTestObjects from "./utils/createTestObjects";
import MaxNumberObject from "../../../src/objects/max/MaxNumberObject";
import { $i, $f, $s } from "../../../src/TypedValue";

describe("MaxNumberObject", () => {
  describe("[> 0 ]", () => {
    const opts = {
      "id": "obj-18",
      "className": "number",
      "tagName": "number",
      "numOfInlets": 1,
      "numOfOutlets": 2,
      "outletTypes": [ "", "bang" ],
      "patchingRect": [ 435, 261.5, 54, 23 ],
      "args": [],
      "attrs": {}
    };
    describe("/bang", () => {
      it("Sends the currently displayed number out the outlet", () => {
        let { sender, receiver } = createTestObjects(MaxNumberObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, $i(0) ]);
      });
    });
    describe("/int", () => {
      it("The number received in the inlet is stored and displayed in the number box and sent out the outlet. A float is converted to int by an int number box, and vice versa", () => {
        let { sender, receiver } = createTestObjects(MaxNumberObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, $i(10));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, $i(10) ]);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 2);
        assert.deepEqual(spy.args[1], [ 0, $i(10) ]);
      });
    });
    describe("/float", () => {
      it("The number received in the inlet is stored and displayed in the number box and sent out the outlet. A float is converted to int by an int number box, and vice versa", () => {
        let { sender, receiver } = createTestObjects(MaxNumberObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, $f(10));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0][1], $i(10));

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 2);
        assert.deepEqual(spy.args[1], [ 0, $i(10) ]);
      });
    });
    describe("/max 10", () => {
      it("The word max, followed by a number, sets the maximum value that can be displayed or sent out by the number box", () => {
        let { sender, receiver } = createTestObjects(MaxNumberObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, [ $s("max"), $i(10) ]);
        assert(spy.callCount === 0);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, $i(0) ]);

        sender.sendMessage(0, $i(20));
        assert(spy.callCount === 2);
        assert.deepEqual(spy.args[1], [ 0, $i(10) ]);

        sender.sendMessage(0, $i(5));
        assert(spy.callCount === 3);
        assert.deepEqual(spy.args[2], [ 0, $i(5) ]);
      });
    });
    describe("/min 10", () => {
      it("The word max, followed by a number, sets the maximum value that can be displayed or sent out by the number box", () => {
        let { sender, receiver } = createTestObjects(MaxNumberObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, [ $s("min"), $i(10) ]);
        assert(spy.callCount === 0);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, $i(10) ]);

        sender.sendMessage(0, $i(20));
        assert(spy.callCount === 2);
        assert.deepEqual(spy.args[1], [ 0, $i(20) ]);

        sender.sendMessage(0, $i(5));
        assert(spy.callCount === 3);
        assert.deepEqual(spy.args[2], [ 0, $i(10) ]);
      });
    });
    describe("/set 10", () => {
      it("The word set , followed by a number, sets the stored and displayed value to that number without triggering output", () => {
        let { sender, receiver } = createTestObjects(MaxNumberObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, [ $s("set"), $i(10) ]);
        assert(spy.callCount === 0);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, $i(10) ]);
      });
    });
  });
});
