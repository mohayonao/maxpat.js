import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxPow extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.pow;
  }
}
