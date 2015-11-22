import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = (a, b) => a + b;

export default class MaxPlus extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0, 0 ];
    this._func = FUNC;
  }
}
