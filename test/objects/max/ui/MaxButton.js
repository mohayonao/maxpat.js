import assert from "power-assert";
import createTestObjects from "../utils/createTestObjects";
import MaxButton from "../../../../src/objects/max/ui/MaxButton";
import { $i, $s } from "../../../../src/TypedValue";

describe("MaxButton", () => {
  describe("[ button ]", () => {
    const opts = {
      "numOfInlets": 1,
      "numOfOutlets": 1,
      "outletTypes": [ "bang" ],
      "args": [],
      "attrs": {}
    };
    describe("basic action", () => {
      let { sender, receiverSpy } = createTestObjects(MaxButton, opts);

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
