import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxUnaryOpAsinObject extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.asin;
  }
}
