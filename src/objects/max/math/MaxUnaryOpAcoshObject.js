import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxUnaryOpAcoshObject extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.acosh;
  }
}
