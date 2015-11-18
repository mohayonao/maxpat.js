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
    describe("/bang", () => {
      it("In left inlet: Sends the number or list most recently received, in sequential order", () => {
        let { sender, receiverSpy } = createTestObjects(MaxIterObject, opts);

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 0);
      });
    });
    describe("/int", () => {
      it("In left inlet: The number is sent out the outlet", () => {
        let { sender, receiverSpy } = createTestObjects(MaxIterObject, opts);

        sender.sendMessage(0, $i(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
      });
    });
    describe("/float", () => {
      it("In left inlet: The number is sent out the outlet", () => {
        let { sender, receiverSpy } = createTestObjects(MaxIterObject, opts);

        sender.sendMessage(0, $f(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10) ]);
      });
    });
    describe("/list", () => {
      it("In left inlet: The numbers in the list are sent out the outlet in sequential order", () => {
        let { sender, receiverSpy } = createTestObjects(MaxIterObject, opts);

        sender.sendMessage(0, [ $i(10), $f(10) ]);
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $f(10) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 0, $i(10) ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $f(10) ]);
      });
    });
    describe("/:else", () => {
      it("In left inlet: See the list entry", () => {
        let { sender, receiverSpy } = createTestObjects(MaxIterObject, opts);

        sender.sendMessage(0, [ $s("set"), $i(10) ]);
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $s("set") ] ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $i(10) ]);
        receiverSpy.reset();

        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 2);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $s("set") ] ]);
        assert.deepEqual(receiverSpy.args[1], [ 0, $i(10) ]);
      });
    });
  });
});
