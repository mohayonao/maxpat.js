import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = Math.pow;

export default class MaxPow extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0, 0 ];
    this._func = FUNC;
  }
}
