import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxUnaryOpSqrtObject extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.sqrt;
  }
}
