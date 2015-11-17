import assert from "power-assert";
import sinon from "sinon";
import createTestObjects from "./utils/createTestObjects";
import MaxToggleObject from "../../../src/objects/max/MaxToggleObject";
import { $i, $f, $s } from "../../../src/TypedValue";

describe("MaxIntObject", () => {
  describe("[ toggle ]", () => {
    const opts = {
      "id": "obj-8",
      "className": "toggle",
      "tagName": "toggle",
      "numOfInlets": 1,
      "numOfOutlets": 1,
      "outletTypes": [ "int" ],
      "patchingRect": [ 95, 175, 136, 136 ],
      "args": [],
      "attrs": {}
    };
    describe("/bang", () => {
      it("Switches toggle on if it is off; switches it off if it is on", () => {
        let { sender, receiver } = createTestObjects(MaxToggleObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, $i(1) ]);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 2);
        assert.deepEqual(spy.args[1], [ 0, $i(0) ]);
      });
    });
    describe("/int", () => {
      it("The number is sent out the outlet", () => {
        let { sender, receiver } = createTestObjects(MaxToggleObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, $i(10));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, $i(10) ]);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 2);
        assert.deepEqual(spy.args[1], [ 0, $i(0) ]);
      });
    });
    describe("/float", () => {
      it("Converted to int", () => {
        let { sender, receiver } = createTestObjects(MaxToggleObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, $f(10));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, $i(10) ]);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 2);
        assert.deepEqual(spy.args[1], [ 0, $i(0) ]);
      });
    });
    describe("/list", () => {
      it("Converted to int", () => {
        let { sender, receiver } = createTestObjects(MaxToggleObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, [ $f(10), $f(20) ]);
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, $i(10) ]);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 2);
        assert.deepEqual(spy.args[1], [ 0, $i(0) ]);
      });
    });
    describe("/set", () => {
      it("Switches the toggle on or off without sending anything out the outlet", () => {
        let { sender, receiver } = createTestObjects(MaxToggleObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, [ $s("set"), $i(10) ]);
        assert(spy.callCount === 0);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, $i(0) ]);
      });
    });
  });
});
