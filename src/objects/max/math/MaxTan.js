import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = Math.tan;

export default class MaxTan extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0 ];
    this._func = FUNC;
  }
}
