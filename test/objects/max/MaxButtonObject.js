import assert from "power-assert";
import createTestObjects from "./utils/createTestObjects";
import MaxButtonObject from "../../../src/objects/max/MaxButtonObject";
import { $i, $s } from "../../../src/TypedValue";

describe("MaxButtonObject", () => {
  describe("[ button ]", () => {
    const opts = {
      "numOfInlets": 1,
      "numOfOutlets": 1,
      "outletTypes": [ "bang" ],
      "args": [],
      "attrs": {}
    };
    describe("/anything", () => {
      it("When any message is received in the inlet, button flashes briefly and a bang is sent out the outlet", () => {
        let { sender, receiverSpy } = createTestObjects(MaxButtonObject, opts);

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $s("bang") ] ]);
        receiverSpy.reset();

        sender.sendMessage(0, $i(1));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $s("bang") ] ]);
      });
    });
  });
});
