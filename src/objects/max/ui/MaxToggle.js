import MaxObject from "../../MaxObject";
import { $i } from "../../../TypedValue";
import toNumber from "../../../utils/toNumber";

export default class MaxToggle extends MaxObject {
  initialize() {
    this._storedValue = $i(0);
  }

  ["/bang"]() {
    this._update(this._storedValue.value ? 0 : 1);
    this._emit();
  }

  ["/int"](inlet, value) {
    this._update(toNumber(value));
    this._emit();
  }

  ["/float"](inlet, value) {
    this._update(toNumber(value));
    this._emit();
  }

  ["/list"](inlet, values) {
    this._update(toNumber(values[0]));
    this._emit();
  }

  ["/set"](inlet, values) {
    this._update(toNumber(values[1]));
  }

  _update(value) {
    this._storedValue = $i(value);
  }

  _emit() {
    this.sendMessage(0, this._storedValue);
  }
}
