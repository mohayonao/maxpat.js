import _MaxUnaryOpObject from "./_MaxUnaryOpObject";

export default class MaxBinaryOpNotEqualsObject extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = func;
  }
}

function func(a, b) {
  return a !== b ? 1 : 0;
}
