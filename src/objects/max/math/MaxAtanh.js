import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = Math.atanh;

export default class MaxAtanh extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0 ];
    this._func = FUNC;
  }
}
