import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxUnaryOpTanObject extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.tan;
  }
}
