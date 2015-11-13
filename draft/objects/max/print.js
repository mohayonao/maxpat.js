export default class PrintObject extends MaxObject {
  initialize(args, attrs) {
    this._identifier = toString(args[0]) || "print";
    this._popup = toInt(attrs.popup);
  }

  ["/bang"](inlet, value) {
    this._print(value);
  }
  
  ["/int"](inlet, value) {
    this._print(value);
  }
  
  ["/float"](inlet, value) {
    this._print(value);
  }
  
  ["/list"](inlet, value) {
    this._print(value);
  }
  
  ["/symbol"](inlet, value) {
    this._print(value);
  }
  
  _print(value) {
    this.patcher.emit("print", {
      identifier: this._identifier,
      value: toString(value),
      popup: this._popup,
    });
  }
}
