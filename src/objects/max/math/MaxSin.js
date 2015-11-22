import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = Math.sin;

export default class MaxSin extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0 ];
    this._func = FUNC;
  }
}
