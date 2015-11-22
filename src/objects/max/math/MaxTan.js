import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxTan extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.tan;
  }
}
