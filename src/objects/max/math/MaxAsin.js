import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxAsin extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.asin;
  }
}
