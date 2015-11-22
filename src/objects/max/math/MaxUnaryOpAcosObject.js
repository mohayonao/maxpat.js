import _MaxUnaryOpObject from "../_MaxUnaryOpObject";

export default class MaxUnaryOpAcosObject extends _MaxUnaryOpObject {
  constructor(...args) {
    super(...args);

    this._func = Math.acos;
  }
}
