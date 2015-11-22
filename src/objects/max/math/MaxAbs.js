import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxAbs extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.abs;
  }
}
