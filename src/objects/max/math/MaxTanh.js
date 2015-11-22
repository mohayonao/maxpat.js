import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxTanh extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.tanh;
  }
}
