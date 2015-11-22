import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxAcosh extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.acosh;
  }
}
