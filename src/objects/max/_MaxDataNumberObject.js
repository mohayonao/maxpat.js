import MaxObject from "../MaxObject";
import TypedValue from "../../TypedValue";
import toNumber from "../../utils/toNumber";
import toString from "../../utils/toString";

export default class _MaxNumberObject extends MaxObject {
  initialize(opts) {
    this._update(opts.args[0]);
  }

  ["/bang"](inlet) {
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

  ["/send"](inlet, values) {
    if (inlet === 0) {
      let target = toString(values[1]);

      this.patcher.sendMessage(target, this._storedValue);
    }
  }

  ["/set"](inlet, values) {
    if (inlet === 0) {
      this._update(values[1]);
    }
  }

  _update(_value) {
    let type = this.outletTypes[0];
    let value = toNumber(_value);

    this._storedValue = new TypedValue(type, value);
  }

  _emit() {
    this.sendMessage(0, this._storedValue);
  }
}
