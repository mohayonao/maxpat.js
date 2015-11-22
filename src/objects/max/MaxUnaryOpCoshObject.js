import _MaxUnaryOpObject from "./_MaxUnaryOpObject";

export default class MaxUnaryOpCoshObject extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.cosh;
  }
}
