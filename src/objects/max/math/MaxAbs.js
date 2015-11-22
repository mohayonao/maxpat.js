import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = Math.abs;

export default class MaxAbs extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0 ];
    this._func = FUNC;
  }
}
