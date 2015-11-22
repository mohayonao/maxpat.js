import MaxObject from "../MaxObject";
import TypedValue from "../../TypedValue";
import toNumber from "../../utils/toNumber";

export default class _MaxUnaryOpObject extends MaxObject {
  initialize(opts) {
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

  _update(_value) {
    let type = this.outletTypes[0];
    let value = this._func(toNumber(_value));

    this._storedValue = new TypedValue(type, value);
  }

  _emit() {
    this.sendMessage(0, this._storedValue);
  }
}
