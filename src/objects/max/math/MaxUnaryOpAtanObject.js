import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxUnaryOpAtanObject extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.atan;
  }
}
