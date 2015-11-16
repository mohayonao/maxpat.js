import MaxObject from "../MaxObject";
import { $i } from "../../TypedValue";
import toNumber from "../../utils/toNumber";

export default class MaxNumberObject extends MaxObject {
  initialize(opts) {
    this._maximum = opts.attrs.maximum ? toNumber(opts.attrs.maximum[0]) : Infinity;
    this._minimum = opts.attrs.minimum ? toNumber(opts.attrs.minimum [0]) : -Infinity;
    this._update(opts.args[0]);
  }

  ["/bang"](inlet) {
    if (inlet === 0) {
      this._emit();
    }
  }

  ["/int"](inlet, value) {
    this._update(value);
    if (inlet === 0) {
      this._emit();
    }
  }

  ["/float"](inlet, value) {
    this._update(value);
    if (inlet === 0) {
      this._emit();
    }
  }

  ["/list"](inlet, values) {
    this._update(values[0]);
    if (inlet === 0) {
      this._emit();
    }
  }

  ["/set"](inlet, values) {
    if (inlet === 0) {
      this._update(values[1]);
    }
  }

  ["/max"](inlet, values) {
    if (inlet === 0) {
      this._maximum = toNumber(values[1]);
    }
  }

  ["/min"](inlet, values) {
    if (inlet === 0) {
      this._minimum = toNumber(values[1]);
    }
  }

  _update(value) {
    this._storedValue = $i(Math.max(this._minimum, Math.min(toNumber(value), this._maximum)));
  }

  _emit() {
    this.sendMessage(0, this._storedValue);
  }
}
