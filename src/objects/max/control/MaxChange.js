import MaxObject from "../../MaxObject";
import { $i } from "../../../TypedValue";
import defaults from "../../../utils/defaults";
import toNumber from "../../../utils/toNumber";
import toString from "../../../utils/toString";

export default class MaxChange extends MaxObject {
  initialize(opts) {
    this._storedValue = toNumber(opts.args[0]);
    this._mode = toMode(toString(defaults(opts.args[1], "")));
  }

  ["/int"](inlet, value) {
    this._update(value, true);
  }

  ["/float"](inlet, value) {
    this._update(value, true);
  }

  ["/list"](inlet, values) {
    this._update(values[0], true);
  }

  ["/set"](inlet, values) {
    this._update(values[1], false);
  }

  ["/mode"](inlet, values) {
    this._mode = toMode(toString(values[1]));
  }

  _update(_value, emit) {
    let value = toNumber(_value);
    let storedValue = this._storedValue;

    this._storedValue = value;

    if (emit && value !== storedValue) {
      if (value === 0) {
        this.sendMessage(2, $i(1));
      }

      if (storedValue === 0) {
        this.sendMessage(1, $i(1));
      }

      switch (this._mode) {
      case "+":
        if (storedValue < value) {
          this.sendMessage(0, $i(1));
        }
        break;
      case "-":
        if (value < storedValue) {
          this.sendMessage(0, $i(-1));
        }
        break;
      default:
        this.sendMessage(0, _value);
        break;
      }
    }
  }
}

function toMode(value) {
  if (value === "-" || value === "+") {
    return value;
  }
  return "";
}
