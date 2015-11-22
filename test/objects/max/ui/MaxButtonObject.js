import assert from "power-assert";
import createTestObjects from "../utils/createTestObjects";
import MaxButtonObject from "../../../../src/objects/max/ui/MaxButtonObject";
import { $i, $s } from "../../../../src/TypedValue";

describe("MaxButtonObject", () => {
  describe("[ button ]", () => {
    const opts = {
      "numOfInlets": 1,
      "numOfOutlets": 1,
      "outletTypes": [ "bang" ],
      "args": [],
      "attrs": {}
    };
    describe("basic action", () => {
      let { sender, receiverSpy } = createTestObjects(MaxButtonObject, opts);

      afterEach(() => {
        receiverSpy.reset();
      });

      it("anything -> bang", () => {
        sender.sendMessage(0, $i(1));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $s("bang") ] ]);
      });
    });
  });
});
