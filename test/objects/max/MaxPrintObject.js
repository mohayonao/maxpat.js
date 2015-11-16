import assert from "power-assert";
import sinon from "sinon";
import MaxObject from "../../../src/objects/MaxObject";
import MaxPrintObject from "../../../src/objects/max/MaxPrintObject";
import { $i, $s } from "../../../src/TypedValue";

const opts = {
  "id": "obj-6",
  "className": "print",
  "tagName": "print",
  "numOfInlets": 1,
  "numOfOutlets": 0,
  "outletTypes": [],
  "patchingRect": [ 310, 294, 102, 23 ],
  "args": [ $s("argument") ],
  "attrs": {
    popup: [ $i(1) ]
  }
};

describe("[ print argument @popup 1 ]", () => {
  let patcher, send, recv, test;

  beforeEach(() => {
    patcher = { emit: sinon.spy() };
    test = new MaxPrintObject(patcher, opts);
    send = new MaxObject(patcher, { numOfInlets: 0, numOfOutlets: test.numOfInlets });
    recv = new MaxObject(patcher, { numOfInlets: test.numOfOutlets, numOfOutlets: 0 });

    for (let i = 0; i < test.numOfInlets; i++) {
      send.connect(test, i, i);
    }
    for (let i = 0; i < test.numOfOutlets; i++) {
      test.connect(recv, i, i);
    }
  });
  describe("/anything", () => {
    it("Messages are not interpreted by the print object. They are simply printed verbatim in the Max Console", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, [ $s("hello"), $s("world") ]);
      assert(spy.callCount === 0);
      assert(patcher.emit.callCount === 1);
      assert.deepEqual(patcher.emit.args[0], [ "print", {
        id: "argument", popup: 1, value: "hello world"
      } ]);
    });
  });
});
