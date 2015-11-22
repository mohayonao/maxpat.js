import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = Math.sinh;

export default class MaxSinh extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0 ];
    this._func = FUNC;
  }
}
