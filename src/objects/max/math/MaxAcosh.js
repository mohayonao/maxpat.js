import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = Math.acosh;

export default class MaxAcosh extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0 ];
    this._func = FUNC;
  }
}
