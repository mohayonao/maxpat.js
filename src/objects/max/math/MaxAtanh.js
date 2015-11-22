import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxUnaryOpAtanhObject extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.atanh;
  }
}
