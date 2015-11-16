import MaxObject from "../MaxObject";
import { $i } from "../../TypedValue";
import toNumber from "../../utils/toNumber";

export default class MaxToggleObject extends MaxObject {
  initialize() {
    this._storedValue = $i(0);
  }

  ["/bang"](inlet) {
    if (inlet === 0) {
      this._update(1 - this._storedValue.value);
      this._emit();
    }
  }

  ["/int"](inlet, value) {
    if (inlet === 0) {
      this._update(toNumber(value));
      this._emit();
    }
  }

  ["/float"](inlet, value) {
    if (inlet === 0) {
      this._update(toNumber(value));
      this._emit();
    }
  }

  _update(value) {
    this._storedValue = $i(value ? 1 : 0);
  }

  _emit() {
    if (this._storedValue.value !== 0) {
      this.poseMessage(0, this._storedValue);
    }
  }
}
