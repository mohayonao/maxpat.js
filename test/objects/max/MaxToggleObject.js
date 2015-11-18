import assert from "power-assert";
import createTestObjects from "./utils/createTestObjects";
import MaxToggleObject from "../../../src/objects/max/MaxToggleObject";
import { $i, $f, $s } from "../../../src/TypedValue";

describe("MaxIntObject", () => {
  describe("[ toggle ]", () => {
    const opts = {
      "numOfInlets": 1,
      "numOfOutlets": 1,
      "outletTypes": [ "int" ],
      "args": [],
      "attrs": {}
    };
    describe("/bang", () => {
      it("Switches toggle on if it is off; switches it off if it is on", () => {
        let { sender, receiverSpy } = createTestObjects(MaxToggleObject, opts);

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(1) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(0) ]);
      });
    });
    describe("/int", () => {
      it("The number is sent out the outlet", () => {
        let { sender, receiverSpy } = createTestObjects(MaxToggleObject, opts);

        sender.sendMessage(0, $i(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(0) ]);
      });
    });
    describe("/float", () => {
      it("Converted to int", () => {
        let { sender, receiverSpy } = createTestObjects(MaxToggleObject, opts);

        sender.sendMessage(0, $f(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(0) ]);
      });
    });
    describe("/list", () => {
      it("Converted to int", () => {
        let { sender, receiverSpy } = createTestObjects(MaxToggleObject, opts);

        sender.sendMessage(0, [ $f(10), $f(20) ]);
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(0) ]);
      });
    });
    describe("/set", () => {
      it("Switches the toggle on or off without sending anything out the outlet", () => {
        let { sender, receiverSpy } = createTestObjects(MaxToggleObject, opts);

        sender.sendMessage(0, [ $s("set"), $i(10) ]);
        assert(receiverSpy.callCount === 0);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(0) ]);
      });
    });
  });
});
