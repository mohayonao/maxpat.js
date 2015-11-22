import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxUnaryOpSinObject extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.sin;
  }
}
