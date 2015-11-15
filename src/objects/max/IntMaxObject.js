import MaxObject from "../MaxObject";
import TypedValue from "../../TypedValue";
import toNumber from "../../utils/toNumber";

export default class IntMaxObject extends MaxObject {
  initialize(args) {
    this._update(args[0]);
  }

  ["/bang"]() {
    this._emit();
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
    this._storedValue = new TypedValue("int", toNumber(value)|0);
  }

  _emit() {
    this.sendMessage(0, [ this._storedValue ]);
  }
}
