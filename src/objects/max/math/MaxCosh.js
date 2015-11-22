import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = Math.cosh;

export default class MaxCosh extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0 ];
    this._func = FUNC;
  }
}
