import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = (a, b) => (b / a) || 0;

export default class MaxRdiv extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0, 0 ];
    this._func = FUNC;
  }
}
