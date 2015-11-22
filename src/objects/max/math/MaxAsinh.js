import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = Math.asinh;

export default class MaxAsinh extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0 ];
    this._func = FUNC;
  }
}
