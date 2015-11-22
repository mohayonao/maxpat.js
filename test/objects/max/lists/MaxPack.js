import assert from "power-assert";
import createTestObjects from "../utils/createTestObjects";
import MaxPack from "../../../../src/objects/max/lists/MaxPack";
import { $i, $f, $s } from "../../../../src/TypedValue";

describe("MaxPack", () => {
  describe("[ pack ]", () => {
    const opts = {
      "numOfInlets": 2,
      "numOfOutlets": 1,
      "outletTypes": [ "" ],
      "args": [],
      "attrs": {}
    };
    describe("basic action", () => {
      let { sender, receiverSpy } = createTestObjects(MaxPack, opts);

      afterEach(() => {
        receiverSpy.reset();
      });

      it("bang -> [ 0 0 ]", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $i(0), $i(0) ] ]);
      });
      it("[ 10.0 20.0 30.0 ] -> [ 10 20 ]", () => {
        sender.sendMessage(0, [ $f(10.0), $f(20.0), $f(30.0) ]);
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $i(10), $i(20) ] ]);
      });
    });
  });
  describe("[ pack 0 0. sym ]", () => {
    const opts = {
      "numOfInlets": 3,
      "numOfOutlets": 1,
      "outletTypes": [ "" ],
      "args": [ $i(0), $f(0), $s("sym") ],
      "attrs": {}
    };
    describe("basic action", () => {
      let { patcher, sender, receiverSpy } = createTestObjects(MaxPack, opts);

      afterEach(() => {
        receiverSpy.reset();
      });

      it("bang -> [ 0 0.0 sym ]", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $i(0), $f(0), $s("sym") ] ]);
      });
      it("10 -> [ 1 0.0 sym ]", () => {
        sender.sendMessage(0, $i(10));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $i(10), $f(0), $s("sym") ] ]);
      });
      it("bang -> [ 10 0.0 sym ]", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $i(10), $f(0), $s("sym") ] ]);
      });
      it("20.0 -> [ 20 0.0 sym ]", () => {
        sender.sendMessage(0, $f(20));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $i(20), $f(0), $s("sym") ] ]);
      });
      it("bang -> [ 20 0.0 sym ]", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $i(20), $f(0), $s("sym") ] ]);
      });
      it("[ 10 20 30 ] => [ 10 20 '30' ]", () => {
        sender.sendMessage(0, [ $i(10), $i(20), $i(30) ]);
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $i(10), $f(20.0), $s("30") ] ]);
      });
      it("foo -> [ 0 20.0 '30' ]", () => {
        sender.sendMessage(0, $s("foo"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $i(0), $f(20.0), $s("30") ] ]);
      });
      it("bang -> [ 0 20.0 '30' ]", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $i(0), $f(20.0), $s("30") ] ]);
      });
      it("set 10 -> NO OPUTPUT", () => {
        sender.sendMessage(0, [ $s("set"), $i(10) ]);
        assert(receiverSpy.callCount === 0);
      });
      it("bang -> [ 10 20.0 '30' ]", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $i(10), $f(20.0), $s("30") ] ]);
      });
      it("nth 2 -> 20.0", () => {
        sender.sendMessage(0, [ $s("nth"), $i(2) ]);assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(20.0) ]);
      });
      it("send goom -> NO OUTPUT", () => {
        sender.sendMessage(0, [ $s("send"), $s("goom") ]);
        assert(receiverSpy.callCount === 0);
        assert(patcher.sendMessage.callCount === 1);
        assert.deepEqual(patcher.sendMessage.args[0], [ "goom", [ $i(10), $f(20.0), $s("30") ] ]);
      });
    });
    describe("action with not 1st inlet", () => {
      let { sender, receiverSpy } = createTestObjects(MaxPack, opts);

      afterEach(() => {
        receiverSpy.reset();
      });

      it("10 -> NO OUTPUT", () => {
        sender.sendMessage(1, $i(10));
        assert(receiverSpy.callCount === 0);
      });
      it("bang -> [ 0 10.0 sym ]", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $i(0), $f(10), $s("sym") ] ]);
      });
      it("20.0 -> NO OUTPUT", () => {
        sender.sendMessage(1, $f(20));
        assert(receiverSpy.callCount === 0);
      });
      it("bang -> [ 0 20.0 sym ]", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $i(0), $f(20), $s("sym") ] ]);
      });
      it("[ 10 20 30 ] => NO OUTPUT", () => {
        sender.sendMessage(1, [ $i(10), $i(20), $i(30) ]);
        assert(receiverSpy.callCount === 0);
      });
      it("bang -> [ 0 10.0 '20' ]", () => {
        sender.sendMessage(0, $s("bang"));
        assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, [ $i(0), $f(10.0), $s("20") ] ]);
      });
      it("nth 2 -> 10.0", () => {
        sender.sendMessage(1, [ $s("nth"), $i(2) ]);assert(receiverSpy.callCount === 1);
        assert.deepEqual(receiverSpy.args[0], [ 0, $f(10.0) ]);
      });
    });
  });
});
