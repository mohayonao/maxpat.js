import assert from "power-assert";
import sinon from "sinon";
import createTestObjects from "./utils/createTestObjects";
import MaxButtonObject from "../../../src/objects/max/MaxButtonObject";
import { $i, $s } from "../../../src/TypedValue";

describe("MaxButtonClass", () => {
  describe("[ button ]", () => {
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
    describe("/anything", () => {
      it("When any message is received in the inlet, button flashes briefly and a bang is sent out the outlet", () => {
        let { sender, receiver } = createTestObjects(MaxButtonObject, opts);
        let spy = receiver["/:else"] = sinon.spy();

        sender.sendMessage(0, $s("bang"));
        assert(spy.callCount === 1);
        assert.deepEqual(spy.args[0], [ 0, [ $s("bang") ] ]);

        sender.sendMessage(0, $i(1));
        assert(spy.callCount === 2);
        assert.deepEqual(spy.args[1], [ 0, [ $s("bang") ] ]);
      });
    });
  });
});
