import MaxObject from "../MaxObject";
import TypedValue from "../../TypedValue";
import toNumber from "../../utils/toNumber";
import constrain from "../../utils/constrain";

export default class _MaxNumberBoxObject extends MaxObject {
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
    this._update(this._storedValue);
  }

  ["/min"](inlet, values) {
    this._minValue = toNumber(values[1]);
    this._update(this._storedValue);
  }

  ["/set"](inlet, values) {
    this._update(values[1]);
  }

  _update(_value) {
    let type = this.outletTypes[0];
    let value = constrain(toNumber(_value), this._minValue, this._maxValue);

    this._storedValue = new TypedValue(type, value);
  }

  _emit() {
    this.sendMessage(0, this._storedValue);
  }
}
