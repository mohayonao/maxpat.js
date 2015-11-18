import sinon from "sinon";
import MaxObject from "../../../../src/objects/MaxObject";

const PATCHING_RECT = [ 0, 0, 0, 0 ];

export default function createTestObjects(Klass, opts) {
  opts.patchingRect = PATCHING_RECT;

  let patcher = { emit: sinon.spy(), sendMessage: sinon.spy() };
  let target = new Klass(patcher, opts);
  let sender = new MaxObject(patcher, { numOfInlets: 0, numOfOutlets: target.numOfInlets, patchingRect: PATCHING_RECT });
  let receiver = new MaxObject(patcher, { numOfInlets: target.numOfOutlets, numOfOutlets: 0, patchingRect: PATCHING_RECT });
  let receiverSpy = receiver["/:else"] = sinon.spy();

  for (let i = 0; i < target.numOfInlets; i++) {
    sender.connect(target, i, i);
  }
  for (let i = 0; i < target.numOfOutlets; i++) {
    target.connect(receiver, i, i);
  }

  return { patcher, target, sender, receiver, receiverSpy };
}
