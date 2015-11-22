import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = Math.acos;

export default class MaxAcos extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0 ];
    this._func = FUNC;
  }
}
