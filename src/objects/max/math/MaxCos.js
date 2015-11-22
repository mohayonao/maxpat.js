import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = Math.cos;

export default class MaxCos extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0 ];
    this._func = FUNC;
  }
}
