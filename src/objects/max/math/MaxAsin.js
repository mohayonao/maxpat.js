import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = Math.asin;

export default class MaxAsin extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0 ];
    this._func = FUNC;
  }
}
