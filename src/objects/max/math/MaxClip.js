import _MaxMathOperator from "../_MaxMathOperator";
import constrain from "../../../utils/constrain";

const FUNC = constrain;

export default class MaxClip extends _MaxMathOperator {
  constructor(...args) {
    super(...args);

    this._values = [ 0, 0, 0 ];
    this._func = FUNC;
  }
}
