import MaxObject from "../../MaxObject";
import TypedValue from "../../../TypedValue";
import toNumber from "../../../utils/toNumber";

export default class MaxAccumObject extends MaxObject {
  initialize(opts) {
    this._values = [ 0, 0, 1 ];

    if (typeof opts.args[0] !== "undefined") {
      this._update(1, opts.args[0]);
    }
    if (typeof opts.args[1] !== "undefined") {
      this._update(2, opts.args[1]);
    }
  }

  ["/bang"](inlet) {
    if (inlet === 0) {
      this._emit();
    }
  }

  ["/int"](inlet, value) {
    this._update(inlet, value);
    if (inlet === 0) {
      this._emit();
    }
  }

  ["/float"](inlet, value) {
    this._update(inlet, value);
    if (inlet === 0) {
      this._emit();
    }
  }

  ["/set"](inlet, values) {
    this._update(inlet, values[1]);
  }

  _update(index, _value) {
    if (0 <= index && index < 3) {
      this._values[index] = toNumber(_value);

      let type = this.outletTypes[0];
      let value = (this._values[0] + this._values[1]) * this._values[2];

      this._storedValue = new TypedValue(type, value);
    }
  }

  _emit() {
    this.sendMessage(0, this._storedValue);
  }
}
