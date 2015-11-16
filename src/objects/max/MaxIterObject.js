import MaxObject from "../MaxObject";
import toArray from "../../utils/toArray";

export default class MaxIterObject extends MaxObject {
  initialize() {
    this._storedValue = null;
  }

  ["/bang"]() {
    this._emit();
  }

  ["/anything"](inlet, values) {
    this._storedValue = toArray(values);
    this._emit();
  }

  _emit() {
    if (this._storedValue !== null) {
      let storedValue = this._storedValue;

      for (let i = 0, imax = storedValue.length; i < imax; i++) {
        this.sendMessage(0, storedValue[i]);
      }
    }
  }
}
