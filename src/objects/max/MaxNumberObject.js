import MaxObject from "../MaxObject";
import { $i } from "../../TypedValue";
import toNumber from "../../utils/toNumber";

export default class MaxNumberObject extends MaxObject {
  initialize(opts) {
    this._maxValue = opts.attrs.maximum ? toNumber(opts.attrs.maximum[0]) : +Infinity;
    this._minValue = opts.attrs.minimum ? toNumber(opts.attrs.minimum[0]) : -Infinity;
    this._update(opts.args[0]);
  }

  ["/bang"]() {
    this._emit();
  }

  ["/int"](inlet, value) {
    this._update(value);
    this._emit();
  }

  ["/float"](inlet, value) {
    this._update(value);
    this._emit();
  }

  ["/list"](inlet, values) {
    this._update(values[0]);
    this._emit();
  }

  ["/max"](inlet, values) {
    this._maxValue = toNumber(values[1]);
  }

  ["/min"](inlet, values) {
    this._minValue = toNumber(values[1]);
  }

  ["/set"](inlet, values) {
    this._update(values[1]);
  }

  _update(value) {
    this._storedValue = $i(Math.max(this._minValue, Math.min(toNumber(value), this._maxValue)));
  }

  _emit() {
    this.sendMessage(0, this._storedValue);
  }
}
