import assert from "power-assert";
import sinon from "sinon";
import createTestObjects from "./utils/createTestObjects";
import MaxPackObject from "../../../src/objects/max/MaxPackObject";
import { $i, $f, $s } from "../../../src/TypedValue";

describe("MaxPackObject", () => {
  describe("[ pack ]", () => {
    const opts = {
      "id": "obj-5",
      "className": "pack",
      "tagName": "pack",
      "numOfInlets": 2,
      "numOfOutlets": 1,
      "outletTypes": [ "" ],
      "patchingRect": [ 45, 329, 175, 2 ],
      "args": [],
      "attrs": {}
    };
    describe("/bang", () => {
      it("Output currently stored list", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(0), $i(0) ] ]);
      });
    });
  });
  describe("[ pack 0 0. sym ]", () => {
    const opts = {
      "id": "obj-5",
      "className": "pack",
      "tagName": "pack",
      "numOfInlets": 3,
      "numOfOutlets": 1,
      "outletTypes": [ "" ],
      "patchingRect": [ 45, 329, 175, 2 ],
      "args": [ $i(0), $f(0), $s("sym") ],
      "attrs": {}
    };
    describe("/bang", () => {
      it("Output currently stored list", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(0), $s("sym") ] ]);
      });
    });
    describe("/int", () => {
      it("1st inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, $i(10));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(10), $f(0), $s("sym") ] ]);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 2);
        assert.deepEqual(spy.args[0], [ 0, [ $i(10), $f(0), $s("sym") ] ]);
      });
      it("2nd inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(1, $i(20));
        assert(spy.callCount === 0);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(20), $s("sym") ] ]);
      });
      it("3rd inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(2, $i(30));
        assert(spy.callCount === 0);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(0), $s("30") ] ]);
      });
    });
    describe("/float", () => {
      it("1st inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, $f(10));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(10), $f(0), $s("sym") ] ]);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 2);
        assert.deepEqual(spy.args[0], [ 0, [ $i(10), $f(0), $s("sym") ] ]);
      });
      it("2nd inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(1, $f(20));
        assert(spy.callCount === 0);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(20), $s("sym") ] ]);
      });
      it("3rd inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(2, $f(30));
        assert(spy.callCount === 0);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(0), $s("30") ] ]);
      });
    });
    describe("/symbol", () => {
      it("1st inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, $s("foo"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(0), $s("sym") ] ]);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 2);
        assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(0), $s("sym") ] ]);
      });
      it("2nd inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(1, $s("bar"));
        assert(spy.callCount === 0);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(0), $s("sym") ] ]);
      });
      it("3rd inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(2, $s("baz"));
        assert(spy.callCount === 0);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(0), $s("baz") ] ]);
      });
    });
    describe("/list", () => {
      it("1st inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, [ $i(10), $f(20) ]);
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(10), $f(20), $s("sym") ] ]);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 2);
        assert.deepEqual(spy.args[0], [ 0, [ $i(10), $f(20), $s("sym") ] ]);
      });
      it("2nd inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(1, [ $i(10), $f(20) ]);
        assert(spy.callCount === 0);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(10), $s("20") ] ]);
      });
      it("3rd inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(2, [ $i(10), $f(20) ]);
        assert(spy.callCount === 0);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(0), $s("10") ] ]);
      });
    });
    describe("/set", () => {
      it("1st inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, [ $s("set"), $i(10) ]);
        assert(spy.callCount === 0);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(10), $f(0), $s("sym") ] ]);
      });
      it("2nd inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(1, [ $s("set"), $i(20) ]);
        assert(spy.callCount === 0);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(20), $s("sym") ] ]);
      });
      it("3rd inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(2, [ $s("set"), $i(30) ]);
        assert(spy.callCount === 0);

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(0), $s("30") ] ]);
      });
    });
    describe("/nth", () => {
      it("1st inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, [ $s("nth"), $i(0) ]);
        assert(spy.callCount === 0);

        sender.sendMessage(0, [ $s("nth"), $i(1) ]);
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, $i(0) ]);
      });
      it("2nd inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(1, [ $s("nth"), $i(2) ]);
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, $f(0) ]);
      });
      it("3rd inlet", () => {
        let { sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(2, [ $s("nth"), $i(3) ]);
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $s("sym") ] ]);
      });
    });
    describe("/send", () => {
      it("In left inlet", () => {
        let { patcher, sender, receiver } = createTestObjects(MaxPackObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, [ $s("send"), $s("goom") ]);
        assert(spy.callCount === 0);
        assert(patcher.sendMessage.callCount === 1);
        assert.deepEqual(patcher.sendMessage.args[0], [ "goom", [ $i(0), $f(0), $s("sym") ] ]);
      });
    });
  });
});
