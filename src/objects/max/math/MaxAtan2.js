import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = Math.atan2;

export default class MaxAtan2 extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0, 0 ];
    this._func = FUNC;
  }
}
