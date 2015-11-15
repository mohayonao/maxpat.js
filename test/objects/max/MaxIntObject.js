import assert from "power-assert";
import sinon from "sinon";
import MaxObject from "../../../src/objects/MaxObject";
import MaxIntObject from "../../../src/objects/max/MaxIntObject";
import { i, f, s } from "../../../src/TypedValue";
import { m } from "../../../src/MaxMessage";

const opts = {
  "id": "obj-22",
  "className": "int",
  "tagName": "int",
  "numOfInlets": 2,
  "numOfOutlets": 1,
  "outletTypes": [ "int" ],
  "patchingRect": [ 195, 296, 90, 23 ],
  "args": [ i(74) ],
  "attrs": {}
};

describe("objects/max/MaxIntObject", () => {
  let send, recv, test;

  beforeEach(() => {
    test = new MaxIntObject({}, opts);
    send = new MaxObject({}, { numOfInlets: 0, numOfOutlets: test.numOfInlets });
    recv = new MaxObject({}, { numOfInlets: test.numOfOutlets, numOfOutlets: 0 });

    for (let i = 0; i < test.numOfInlets; i++) {
      send.connect(test, i, i);
    }
    for (let i = 0; i < test.numOfOutlets; i++) {
      test.connect(recv, i, i);
    }
  });
  describe("/bang", () => {
    it("In left inlet: Sends the stored value out the outlet", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, m([ s("bang") ]));
      assert(spy.callCount === 1);
      assert(spy.args[0][0] === 0);
      assert.deepEqual(spy.args[0][1], [ i(74) ]);
    });
    it("In right inlet: ignored", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(1, m([ s("bang") ]));
      assert(spy.callCount === 0);
    });
  });
  describe("/int", () => {
    it("In left inlet: The number replaces the currently stored value and is sent out the outlet", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, m([ i(10) ]));
      assert(spy.callCount === 1);
      assert(spy.args[0][0] === 0);
      assert.deepEqual(spy.args[0][1], [ i(10) ]);

      send.sendMessage(0, m([ s("bang") ]));
      assert(spy.callCount === 2);
      assert(spy.args[1][0] === 0);
      assert.deepEqual(spy.args[1][1], [ i(10) ]);
    });
    it("In right inlet: The number replaces the stored value without triggering output", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(1, m([ i(10) ]));
      assert(spy.callCount === 0);

      send.sendMessage(0, m([ s("bang") ]));
      assert(spy.callCount === 1);
      assert(spy.args[0][0] === 0);
      assert.deepEqual(spy.args[0][1], [ i(10) ]);
    });
  });
  describe("/float", () => {
    it("In left inlet: Converted to int", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, m([ f(10) ]));
      assert(spy.callCount === 1);
      assert(spy.args[0][0] === 0);
      assert.deepEqual(spy.args[0][1], [ i(10) ]);

      send.sendMessage(0, m([ s("bang") ]));
      assert(spy.callCount === 2);
      assert(spy.args[1][0] === 0);
      assert.deepEqual(spy.args[1][1], [ i(10) ]);
    });
    it("In right inlet: Converted to int", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(1, m([ f(10) ]));
      assert(spy.callCount === 0);

      send.sendMessage(0, m([ s("bang") ]));
      assert(spy.callCount === 1);
      assert(spy.args[0][0] === 0);
      assert.deepEqual(spy.args[0][1], [ i(10) ]);
    });
  });
  describe.skip("/send", () => {
    it("In left inlet: The word send, followed by the name of a receive object, sends the value stored in int to all receive objects with that name, without sending it out the outlet of the int", () => {
    });
  });
  describe("/set", () => {
    it("In left inlet: The word set , followed by a number, replaces the stored value without triggering output", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, m([ s("set"), f(10) ]));
      assert(spy.callCount === 0);

      send.sendMessage(0, m([ s("bang") ]));
      assert(spy.callCount === 1);
      assert(spy.args[0][0] === 0);
      assert.deepEqual(spy.args[0][1], [ i(10) ]);
    });
    it("In right inlet: ignored", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(1, m([ s("set"), f(10) ]));
      assert(spy.callCount === 0);
    });
  });
});
