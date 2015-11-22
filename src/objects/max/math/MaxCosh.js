import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxCosh extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.cosh;
  }
}
