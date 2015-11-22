import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxUnaryOpSinhObject extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.sinh;
  }
}
