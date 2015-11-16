import MaxObject from "../MaxObject";
import { $i } from "../../TypedValue";
import toNumber from "../../utils/toNumber";
import toString from "../../utils/toString";

export default class MaxIntObject extends MaxObject {
  initialize(opts) {
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

  ["/send"](inlet, values) {
    if (inlet === 0) {
      this.patcher.sendMessage(toString(values[1]), this._storedValue);
    }
  }

  ["/set"](inlet, values) {
    if (inlet === 0) {
      this._update(values[1]);
    }
  }

  _update(value) {
    this._storedValue = $i(toNumber(value));
  }

  _emit() {
    this.sendMessage(0, this._storedValue);
  }
}
