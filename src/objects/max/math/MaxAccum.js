import MaxObject from "../../MaxObject";
import TypedValue from "../../../TypedValue";
import toNumber from "../../../utils/toNumber";

export default class MaxAccum extends MaxObject {
  initialize(opts) {
    this._values = [ 0, 0, 0 ];
    this._update(0, opts.args[0]);
  }

  ["/bang"](inlet) {
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

  _update(inlet, _value) {
    if (0 <= inlet && inlet < 3) {
      this._values[inlet] = toNumber(_value);
      this._values[0] = (this._values[0] + this._values[1]) * this._values[2];

      let type = this.outletTypes[0];
      let value = this._values[0];

      this._storedValue = new TypedValue(type, value);
    }
  }

  _emit() {
    this.sendMessage(0, this._storedValue);
  }
}
