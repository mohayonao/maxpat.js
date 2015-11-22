import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxBinaryOpAtan2Object extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.atan2;
  }
}
