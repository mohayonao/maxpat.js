import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = Math.tanh;

export default class MaxTanh extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0 ];
    this._func = FUNC;
  }
}
