import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = Math.atan;

export default class MaxAtan extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0 ];
    this._func = FUNC;
  }
}
