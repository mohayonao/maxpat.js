import assert from "power-assert";
import sinon from "sinon";
import MaxObject from "../../../src/objects/MaxObject";
import MaxButtonObject from "../../../src/objects/max/MaxButtonObject";
import { $i, $s } from "../../../src/TypedValue";

const opts = {
  "id": "obj-20",
  "className": "button",
  "tagName": "button",
  "numOfInlets": 1,
  "numOfOutlets": 1,
  "outletTypes": [ "bang" ],
  "patchingRect": [ 94, 150, 136, 136 ],
  "args": [],
  "attrs": {}
};

describe("objects/max/MaxButtonObject", () => {
  let patcher, send, recv, test;

  beforeEach(() => {
    patcher = { sendMessage: sinon.spy() };
    test = new MaxButtonObject(patcher, opts);
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
    it("In left inlet: When any message is received in the inlet, button flashes briefly and a bang is sent out the outlet", () => {
      let spy = recv["/anything"] = sinon.spy();

      send.sendMessage(0, $s("bang"));
      assert(spy.callCount === 1);
      assert.deepEqual(spy.args[0], [ 0, [ $s("bang") ] ]);

      send.sendMessage(0, $i(1));
      assert(spy.callCount === 2);
      assert.deepEqual(spy.args[1], [ 0, [ $s("bang") ] ]);
    });
  });
});
