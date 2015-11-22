import _MaxUnaryOpObject from "./_MaxUnaryOpObject";

export default class MaxBinaryOpShiftRightObject extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = func;
  }
}

function func(a, b) {
  return a >> b;
}
