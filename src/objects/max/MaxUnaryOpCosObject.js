import _MaxUnaryOpObject from "./_MaxUnaryOpObject";

export default class MaxUnaryOpCosObject extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.cos;
  }
}
