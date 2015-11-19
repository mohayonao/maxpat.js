import assert from "power-assert";
import createTestObjects from "./utils/createTestObjects";
import MaxIterObject from "../../../src/objects/max/MaxIterObject";
import { $i, $f, $s } from "../../../src/TypedValue";

describe("MaxIterObject", () => {
  describe("[ iter ]", () => {
    const opts = {
      "numOfInlets": 1,
      "numOfOutlets": 1,
      "outletTypes": [ "" ],
      "args": [],
      "attrs": {}
    };
    describe("basic action", () => {
      let { sender, receiverSpy } = createTestObjects(MaxIterObject, opts);

      afterEach(() => {
        receiverSpy.reset();
      });

      it("bang -> NO OUTPUT", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 0);
      });
      it("10 -> 10", () => {
        sender.sendMessage(0, $i(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
      });
      it("bang -> 10", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
      });
      it("10.0 -> 10.0", () => {
        sender.sendMessage(0, $f(10.0));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10.0) ]);
      });
      it("bang -> 10.0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10.0) ]);
      });
      it("[ 10 20.0 ] -> 10, 20.0", () => {
        sender.sendMessage(0, [ $i(10), $f(20.0) ]);
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $f(20.0) ]);
      });
      it("bang -> 10, 20.0", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $f(20.0) ]);
      });
      it("set 10 -> set, 10", () => {
        sender.sendMessage(0, [ $s("set"), $i(10) ]);
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $s("set") ] ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $i(10) ]);
      });
      it("bang -> set, 10", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $s("set") ] ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $i(10) ]);
      });
    });
  });
});
