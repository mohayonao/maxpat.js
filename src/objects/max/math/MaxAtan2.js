import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxAtan2 extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.atan2;
  }
}
