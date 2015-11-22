import _MaxUnaryOpObject from "./_MaxUnaryOpObject";

export default class MaxUnaryOpAsinhObject extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.asinh;
  }
}
