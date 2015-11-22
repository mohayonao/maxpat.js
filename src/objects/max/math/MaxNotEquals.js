import _MaxMathOperator from "../_MaxMathOperator";

const FUNC = (a, b) => a !== b ? 1 : 0;

export default class MaxNotEquals extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._vaues = [ 0, 0 ];
    this._func = FUNC;
  }
}
