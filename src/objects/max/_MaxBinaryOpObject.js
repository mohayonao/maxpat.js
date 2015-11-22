import MaxObject from "../MaxObject";
import TypedValue from "../../TypedValue";
import toNumber from "../../utils/toNumber";

export default class _MaxBinaryOpObject extends MaxObject {
  initialize(opts) {
    this._values = [ 0, 0 ];
    this._update(1, opts.args[0]);
  }

  ["/bang"](inlet) {
    if (inlet === 0) {
      this.emit();
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

  ["/list"](inlet, values) {
    values.forEach((value, index) => {
      this._update(inlet + index, value);
    });
    if (inlet === 0) {
      this._emit();
    }
  }

  ["/set"](inlet, values) {
    if (inlet === 0) {
      this._update(values[1]);
    }
  }

  _update(inlet, _value) {
    if (0 <= inlet && inlet < 2) {
      this._values[inlet] = toNumber(_value);

      let type = this.outletTypes[0];
      let value = this._func(this._values[0], this._values[1])

      this._storedValue = new TypedValue(type, value);
    }
  }

  _emit() {
    this.sendMessage(0, this._storedValue);
  }
}
