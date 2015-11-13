export default class PlusObject extends MaxObject {
  initialize() {
    this._storedValues = [ 0, 0 ];
  }

  ["/bang"](inlet) {
    this._emit();
  }
  
  ["/int"](inlet, value) {
    this._update(inlet, value);
    if (inlet === 0) {
      this._emit();
    }
  }
  
  ["/float"](inlet, value) {
    this._update(inlet, value);
    if (inlet === 0) {
      this._emit();
    }
  }
  
  ["/set"](inlet, value) {
    this._update(inlet, value);
  }
  
  ["/list"](inlet, value) {
    if (inlet !== 0) {
      return;
    }
    this._update(0, value.value[0]);
    this._update(1, value.value[1]);
    this._emit();
  }
  
  _update(inlet, type, value) {
    this._storedValues[inlet] = to(this.outletTypes[0], value).value;
  }
  
  _emit() {
    let type = this.outletTypes[0];
    let value = this._storedValues[0] + this._storedValues[1];
    
    this.emitMessage(0, new TypedValue(type, value));
  }
}
