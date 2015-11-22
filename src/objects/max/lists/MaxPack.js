import MaxObject from "../../MaxObject";
import TypedValue, { $i } from "../../../TypedValue";
import toNumber from "../../../utils/toNumber";
import toString from "../../../utils/toString";

export default class MaxPack extends MaxObject {
  initialize(opts) {
    if (opts.args.length === 0) {
      this._storedValue = [ $i(0), $i(0) ];
    } else {
      this._storedValue = opts.args.slice();
    }
  }

  ["/bang"](inlet) {
    if (inlet === 0) {
      this._emit();
    }
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

  ["/list"](inlet, values) {
    values.forEach((value, index) => {
      this._update(inlet + index, value);
    });
    if (inlet === 0) {
      this._emit();
    }
  }

  ["/nth"](inlet, values) {
    let nth = toNumber(values[1])|0;

    this._emitNth(nth - 1)
  }

  ["/send"](inlet, values) {
    if (inlet === 0) {
      this.patcher.sendMessage(toString(values[1]), this._storedValue);
    }
  }

  ["/set"](inlet, values) {
    values.slice(1).forEach((value, index) => {
      this._update(inlet + index, value);
    });
  }

  ["/symbol"](inlet, values) {
    this._update(inlet, values[1]);
    if (inlet === 0) {
      this._emit();
    }
  }

  ["/:else"](inlet, values) {
    this._update(inlet, values[0]);
    if (inlet === 0) {
      this._emit();
    }
  }

  _update(index, value) {
    if (0 <= index && index < this._storedValue.length) {
      let type = this._storedValue[index].type;

      this._storedValue[index] = new TypedValue(type, value.valueOf());
    }
  }

  _emit() {
    this.sendMessage(0, this._storedValue);
  }

  _emitNth(index) {
    if (0 <= index && index < this._storedValue.length) {
      this.sendMessage(0, this._storedValue[index]);
    }
  }
}
