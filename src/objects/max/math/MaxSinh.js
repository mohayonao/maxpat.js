import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxSinh extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.sinh;
  }
}
