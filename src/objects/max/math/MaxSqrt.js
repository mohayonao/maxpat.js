import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = Math.sqrt;

export default class MaxSqrt extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0 ];
    this._func = FUNC;
  }
}
