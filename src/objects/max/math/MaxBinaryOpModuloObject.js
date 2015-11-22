import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxBinaryOpModuloObject extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = func;
  }
}

function func(a, b) {
  return (a % b) || 0;
}
