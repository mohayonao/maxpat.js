import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = (a, b) => b - a;

export default class MaxRminus extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0, 0 ];
    this._func = FUNC;
  }
}
