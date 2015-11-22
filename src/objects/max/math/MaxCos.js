import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxCos extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.cos;
  }
}
