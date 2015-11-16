import MaxObject from "../MaxObject";
import { $m } from "../../MaxMessage";

export default class MaxIterObject extends MaxObject {
  initialize() {
    this._storedValue = null;
  }

  ["/bang"](inlet) {
    if (inlet === 0) {
      this._emit();
    }
  }

  ["/list"](inlet, values) {
    if (inlet === 0) {
      this._storedValue = values;
      this._emit();
    }
  }

  ["/anything"](inlet, values) {
    if (inlet === 0) {
      this._storedValue = values;
      this._emit();
    }
  }

  _emit() {
    if (this._storedValue !== null) {
      let storedValue = this._storedValue;

      for (let i = 0, imax = storedValue.length; i < imax; i++) {
        this.sendMessage(0, $m([ storedValue[i] ]));
      }
    }
  }
}
