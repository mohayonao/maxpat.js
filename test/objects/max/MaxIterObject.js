import assert from "power-assert";
import sinon from "sinon";
import MaxObject from "../../../src/objects/MaxObject";
import MaxIterObject from "../../../src/objects/max/MaxIterObject";
import { $i, $f, $s } from "../../../src/TypedValue";
import { $m } from "../../../src/MaxMessage";

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

describe("objects/max/MaxIterObject", () => {
  let patcher, send, recv, test;

  beforeEach(() => {
    patcher = { sendMessage: sinon.spy() };
    test = new MaxIterObject(patcher, opts);
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
    it("In left inlet: Sends the number or list most recently received, in sequential order", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, $m($s("bang")));
      assert(spy.callCount === 0);
    });
    it("In right inlet: ignored", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(1, $m($s("bang")));
      assert(spy.callCount === 0);
    });
  });
  describe("/int", () => {
    it("In left inlet: The number is sent out the outlet", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, $m($i(10)));
      assert(spy.callCount === 1);
      assert(spy.args[0][0] === 0);
      assert.deepEqual(spy.args[0][1], $i(10));
      //
      send.sendMessage(0, $m($s("bang")));
      assert(spy.callCount === 2);
      assert(spy.args[1][0] === 0);
      assert.deepEqual(spy.args[1][1], $i(10));
    });
    it("In right inlet: ignored", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(1, $m($i(10)));
      assert(spy.callCount === 0);
    });
  });
  describe("/float", () => {
    it("In left inlet: The number is sent out the outlet", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, $m($f(10)));
      assert(spy.callCount === 1);
      assert(spy.args[0][0] === 0);
      assert.deepEqual(spy.args[0][1], $f(10));

      send.sendMessage(0, $m($s("bang")));
      assert(spy.callCount === 2);
      assert(spy.args[1][0] === 0);
      assert.deepEqual(spy.args[1][1], $f(10));
    });
    it("In right inlet: ignored", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(1, $m($f(10)));
      assert(spy.callCount === 0);
    });
  });
  describe("/list", () => {
    it("In left inlet: The numbers in the list are sent out the outlet in sequential order", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, $m([ $i(10), $f(10) ]));
      assert(spy.callCount === 2);
      assert(spy.args[0][0] === 0);
      assert.deepEqual(spy.args[0][1], $i(10));
      assert(spy.args[1][0] === 0);
      assert.deepEqual(spy.args[1][1], $f(10));

      send.sendMessage(0, $m([ $s("bang") ]));
      assert(spy.callCount === 4);
      assert(spy.args[2][0] === 0);
      assert.deepEqual(spy.args[2][1], $i(10));
      assert(spy.args[3][0] === 0);
      assert.deepEqual(spy.args[3][1], $f(10));
    });
    it("In right inlet: ignored", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(1, $m([ $i(10), $f(10) ]));
      assert(spy.callCount === 0);
    });
  });
  describe("/anything", () => {
    it("In left inlet: See the list entry", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, $m([ $s("set"), $i(10) ]));
      assert(spy.callCount === 2);
      assert(spy.args[0][0] === 0);
      assert.deepEqual(spy.args[0][1], [ $s("set") ]);
      assert(spy.args[1][0] === 0);
      assert.deepEqual(spy.args[1][1], $i(10));

      send.sendMessage(0, $m([ $s("bang") ]));
      assert(spy.callCount === 4);
      assert(spy.args[2][0] === 0);
      assert.deepEqual(spy.args[0][1], [ $s("set") ]);
      assert(spy.args[3][0] === 0);
      assert.deepEqual(spy.args[1][1], $i(10));
    });
    it("In right inlet: ignored", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(1, $m([ $s("set"), $i(10) ]));
      assert(spy.callCount === 0);
    });
  });
});
