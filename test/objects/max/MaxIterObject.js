import assert from "power-assert";
import sinon from "sinon";
import createTestObjects from "./utils/createTestObjects";
import MaxIterObject from "../../../src/objects/max/MaxIterObject";
import { $i, $f, $s } from "../../../src/TypedValue";

describe("MaxIterObject", () => {
  describe("[ iter ]", () => {
    const opts = {
      "id": "obj-17",
      "className": "iter",
      "tagName": "iter",
      "numOfInlets": 1,
      "numOfOutlets": 1,
      "outletTypes": [ "" ],
      "patchingRect": [ 92, 213, 27, 21 ],
      "args": [],
      "attrs": {}
    };
    describe("/bang", () => {
      it("In left inlet: Sends the number or list most recently received, in sequential order", () => {
        let { sender, receiver } = createTestObjects(MaxIterObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 0);
      });
    });
    describe("/int", () => {
      it("In left inlet: The number is sent out the outlet", () => {
        let { sender, receiver } = createTestObjects(MaxIterObject, opts);
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
      it("In left inlet: The number is sent out the outlet", () => {
        let { sender, receiver } = createTestObjects(MaxIterObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, $f(10));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, $f(10) ]);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 2);
        assert.deepEqual(spy.args[1], [ 0, $f(10) ]);
      });
    });
    describe("/list", () => {
      it("In left inlet: The numbers in the list are sent out the outlet in sequential order", () => {
        let { sender, receiver } = createTestObjects(MaxIterObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, [ $i(10), $f(10) ]);
        assert(spy.callCount === 2);
        assert.deepEqual(spy.args[0], [ 0, $i(10) ]);
        assert.deepEqual(spy.args[1], [ 0, $f(10) ]);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 4);
        assert.deepEqual(spy.args[2], [ 0, $i(10) ]);
        assert.deepEqual(spy.args[3], [ 0, $f(10) ]);
      });
    });
    describe("/:else", () => {
      it("In left inlet: See the list entry", () => {
        let { sender, receiver } = createTestObjects(MaxIterObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, [ $s("set"), $i(10) ]);
        assert(spy.callCount === 2);
        assert.deepEqual(spy.args[0], [ 0, [ $s("set") ] ]);
        assert.deepEqual(spy.args[1], [ 0, $i(10) ]);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 4);
        assert.deepEqual(spy.args[2], [ 0, [ $s("set") ] ]);
        assert.deepEqual(spy.args[3], [ 0, $i(10) ]);
      });
    });
  });
});
