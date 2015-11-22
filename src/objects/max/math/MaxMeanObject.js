import MaxObject from "../../MaxObject";
import TypedValue from "../../../TypedValue";
import toNumber from "../../../utils/toNumber";

export default class MaxMeanObject extends MaxObject {
  initialize() {
    this._storedValue = [];
    this._meanValue = new TypedValue("float", 0);
    this._manyValue = new TypedValue("int", 0);
  }

  ["/bang"]() {
    this._emit();
  }

  ["/int"](inlet, value) {
    this._append([ value ]);
    this._emit();
  }

  ["/float"](inlet, value) {
    this._append([ value ]);
    this._emit();
  }

  ["/list"](inlet, values) {
    this._append(values);
    this._emit();
  }

  ["/clear"]() {
    this._storedValue = [];
  }

  _append(...values) {
    this._storedValue.push(...values.map(toNumber));
    this._meanValue = new TypedValue("float", mean(this._storedValue));
    this._manyValue = new TypedValue("int", this._storedValue.length);
  }

  _emit() {
    this.sendMessage(1, this._manyValue);
    this.sendMessage(0, this._meanValue);
  }
}

function mean(values) {
  return values.reduce((a, b) => a + b, 0) / values.length
}
