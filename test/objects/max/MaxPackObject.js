import assert from "power-assert";
import sinon from "sinon";
import MaxObject from "../../../src/objects/MaxObject";
import MaxPackObject from "../../../src/objects/max/MaxPackObject";
import { $i, $f, $s } from "../../../src/TypedValue";

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

describe("objects/max/MaxPackObject", () => {
  let patcher, send, recv, test;

  beforeEach(() => {
    patcher = { sendMessage: sinon.spy() };
    test = new MaxPackObject(patcher, opts);
    send = new MaxObject(patcher, { numOfInlets: 0, numOfOutlets: test.numOfInlets });
    recv = new MaxObject(patcher, { numOfInlets: test.numOfOutlets, numOfOutlets: 0 });

    for (let i = 0; i < test.numOfInlets; i++) {
      send.connect(test, i, i);
    }
    for (let i = 0; i < test.numOfOutlets; i++) {
      test.connect(recv, i, i);
    }
  });
  describe("/bang", () => {
    it("In left inlet: Output currently stored list", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, $s("bang"));
      assert(spy.callCount === 1);
      assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(0), $s("sym") ] ]);
    });
    it("In right inlet: ignored", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(1, $s("bang"));
      assert(spy.callCount === 0);
    });
  });
  describe("/int", () => {
    it("In left inlet", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, $i(10));
      assert(spy.callCount === 1);
      assert.deepEqual(spy.args[0], [ 0, [ $i(10), $f(0), $s("sym") ] ]);

      send.sendMessage(0, $s("bang"));
      assert(spy.callCount === 2);
      assert.deepEqual(spy.args[0], [ 0, [ $i(10), $f(0), $s("sym") ] ]);
    });
    it("In right inlet", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(1, $i(10));
      assert(spy.callCount === 0);

      send.sendMessage(0, $s("bang"));
      assert(spy.callCount === 1);
      assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(10), $s("sym") ] ]);
    });
  });
  describe("/float", () => {
    it("In left inlet", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, $f(10));
      assert(spy.callCount === 1);
      assert.deepEqual(spy.args[0], [ 0, [ $i(10), $f(0), $s("sym") ] ]);

      send.sendMessage(0, $s("bang"));
      assert(spy.callCount === 2);
      assert.deepEqual(spy.args[0], [ 0, [ $i(10), $f(0), $s("sym") ] ]);
    });
    it("In right inlet", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(1, $f(10));
      assert(spy.callCount === 0);

      send.sendMessage(0, $s("bang"));
      assert(spy.callCount === 1);
      assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(10), $s("sym") ] ]);
    });
  });
  describe("/list", () => {
    it("In left inlet", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, [ $i(10), $f(10) ]);
      assert(spy.callCount === 1);
      assert.deepEqual(spy.args[0], [ 0, [ $i(10), $f(10), $s("sym") ] ]);

      send.sendMessage(0, $s("bang"));
      assert(spy.callCount === 2);
      assert.deepEqual(spy.args[0], [ 0, [ $i(10), $f(10), $s("sym") ] ]);
    });
    it("In right inlet: ignored", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(1, [ $i(10), $f(10) ]);
      assert(spy.callCount === 0);

      send.sendMessage(0, $s("bang"));
      assert(spy.callCount === 1);
      assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(10), $s("10") ] ]);
    });
  });
  describe("/set", () => {
    it("In left inlet", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, [ $s("set"), $i(10) ]);
      assert(spy.callCount === 0);

      send.sendMessage(0, $s("bang"));
      assert(spy.callCount === 1);
      assert.deepEqual(spy.args[0], [ 0, [ $i(10), $f(0), $s("sym") ] ]);
    });
    it("In right inlet", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(1, [ $s("set"), $i(10) ]);
      assert(spy.callCount === 0);

      send.sendMessage(0, $s("bang"));
      assert(spy.callCount === 1);
      assert.deepEqual(spy.args[0], [ 0, [ $i(0), $f(10), $s("sym") ] ]);
    });
  });
  describe("/nth", () => {
    it("In left inlet", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, [ $s("nth"), $i(0) ]);
      assert(spy.callCount === 0);

      send.sendMessage(0, [ $s("nth"), $i(1) ]);
      assert(spy.callCount === 1);
      assert.deepEqual(spy.args[0], [ 0, $i(0) ]);

      send.sendMessage(0, [ $s("nth"), $i(2) ]);
      assert(spy.callCount === 2);
      assert.deepEqual(spy.args[1], [ 0, $f(0) ]);

      send.sendMessage(0, [ $s("nth"), $i(3) ]);
      assert(spy.callCount === 3);
      assert.deepEqual(spy.args[2], [ 0, [ $s("sym") ] ]);
    });
    it("In right inlet", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(1, [ $s("nth"), $i(1) ]);
      assert(spy.callCount === 0);
    });
  });
  describe("/send", () => {
    it("In left inlet", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, [ $s("send"), $s("goom") ]);
      assert(spy.callCount === 0);
      assert(patcher.sendMessage.callCount === 1);
      assert.deepEqual(patcher.sendMessage.args[0], [ "goom", [ $i(0), $f(0), $s("sym") ] ]);
    });
  });
});
