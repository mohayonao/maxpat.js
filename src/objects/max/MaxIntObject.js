import MaxObject from "../MaxObject";
import { i } from "../../TypedValue";
import { m } from "../../MaxMessage";
import toNumber from "../../utils/toNumber";

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

  ["/set"](inlet, value) {
    if (inlet === 0) {
      this._update(value);
    }
  }

  // ["/send"](inlet, value) {
  // }

  _update(value) {
    this._storedValue = i(toNumber(value));
  }

  _emit() {
    this.sendMessage(0, m([ this._storedValue ]));
  }
}
