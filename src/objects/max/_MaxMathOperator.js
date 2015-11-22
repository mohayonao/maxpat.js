import MaxObject from "../MaxObject";
import TypedValue from "../../TypedValue";
import toNumber from "../../utils/toNumber";

export default class _MaxMathOperator extends MaxObject {
  initialize(opts) {
    this._values.forEach((_, i) => {
      if (typeof opts.args[i] === "object") {
        this._update(i + 1, opts.args[i]);
      }
    });
  }

  ["/bang"](inlet) {
    if (inlet === 0) {
      this.emit();
    }
  }

  ["/int"](inlet, value) {
    this._update(inlet, [ value ]);
    if (inlet === 0) {
      this._emit();
    }
  }

  ["/float"](inlet, value) {
    this._update(inlet, [ value ]);
    if (inlet === 0) {
      this._emit();
    }
  }

  ["/list"](inlet, values) {
    this._update(inlet, values);
    if (inlet === 0) {
      this._emit();
    }
  }

  ["/set"](inlet, values) {
    if (inlet === 0) {
      this._update(values[1]);
    }
  }

  _update(inlet, values) {
    values.forEach((value, _index) => {
      let index = inlet + _index;

      if (0 <= index && index < this._values.length) {
        this._values[index] = toNumber(value);
      }
    });

    let type = this.outletTypes[0];
    let value = this._func(...this._values);

    this._storedValue = new TypedValue(type, value);
  }

  _emit() {
    this.sendMessage(0, this._storedValue);
  }
}
