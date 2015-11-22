import MaxObject from "../../MaxObject";
import { $i, $s } from "../../../TypedValue";
import toNumber from "../../../utils/toNumber";
import constrain from "../../../utils/constrain";

const MODE_UP = 0, MODE_DOWN = 1, MODE_UPDOWN = 2;
const CARRYFLAG_NUMERIC = 0, CARRYFLAG_BANG = 1;

export default class MaxCounter extends MaxObject {
  initialize(opts) {
    switch (opts.args.length) {
    case 0:
      this._countMode = MODE_UP;
      this._minValue = 0;
      this._maxValue = Infinity;
      this._storedValue = this._minValue;
      this._maxCounter = 0;
      this._carryMode = CARRYFLAG_NUMERIC;
      this._minimumMode = 0;
      this._direction = 1;
      break;
    case 1:
      this._countMode = MODE_UP;
      this._minValue = 0;
      this._maxValue = toNumber(opts.args[0])|0;
      this._storedValue = this._minValue;
      this._maxCounter = 0;
      this._carryMode = CARRYFLAG_NUMERIC;
      this._minimumMode = 0;
      this._direction = 1;
      break;
    case 2:
      this._countMode = MODE_UP;
      this._minValue = toNumber(opts.args[0])|0;
      this._maxValue = toNumber(opts.args[1])|0;
      this._storedValue = this._minValue;
      this._maxCounter = 0;
      this._carryMode = CARRYFLAG_NUMERIC;
      this._minimumMode = 0;
      this._direction = 1;
      break;
    default:
      this._countMode = constrain(toNumber(opts.args[0])|0, 0, 2);
      this._minValue = toNumber(opts.args[1])|0;
      this._maxValue = toNumber(opts.args[2])|0;
      this._storedValue = this._minValue;
      this._maxCounter = 0;
      this._carryMode = CARRYFLAG_NUMERIC;
      this._minimumMode = 0;
      this._direction = 1;
      break;
    }
  }

  ["/bang"](inlet) {
    switch (inlet) {
    case 0:
      this._update();
      break;
    case 1:
      this._countMode = (this._countMode + 1) % 3;
      break;
    case 2:
      this._storedValue = this._minValue;
      break;
    case 3:
      this._storedValue = this._minValue;
      this._update();
      break;
    case 4:
      this._storedValue = this._maxValue;
      this._update();
      break;
    }
  }

  ["/float"](inlet, value) {
    switch (inlet) {
    case 0:
      this._update();
      break;
    case 1:
      this._countMode = constrain(toNumber(value)|0, 0, 2);
      break;
    case 2:
      this._storedValue = toNumber(value)|0;
      if (this._storedValue < this._minValue) {
        this._minValue = this._storedValue;
      }
      if (this._maxValue < this._storedValue) {
        this._minValue = this._storedValue;
        this._maxValue = this._storedValue;
      }
      this._storedValue = constrain(this._storedValue, this._minValue, this._maxValue);
      break;
    case 3:
      this._storedValue = toNumber(value)|0;
      if (this._storedValue < this._minValue) {
        this._minValue = this._storedValue;
      }
      if (this._maxValue < this._storedValue) {
        this._minValue = this._storedValue;
        this._maxValue = this._storedValue;
      }
      this._storedValue = constrain(this._storedValue, this._minValue, this._maxValue);
      this._update();
      break;
    case 4:
      this._maxValue = toNumber(value)|0;
      if (this._maxValue < this._minValue) {
        this._maxValue = this._minValue + 1;
      }
      this._storedValue = constrain(this._storedValue, this._minValue, this._maxValue);
      break;
    }
  }

  ["/set"](inlet, values) {
    if (inlet === 0) {
      this._storedValue = constrain(toNumber(values[1]), this._minValue, this._maxValue);
    }
  }

  ["/jam"](inlet, values) {
    if (inlet === 0) {
      this._storedValue = constrain(toNumber(values[1]), this._minValue, this._maxValue);
      this._update();
    }
  }

  ["/goto"](inlet, values) {
    if (inlet === 0) {
      this["/set"](inlet, values);
    }
  }

  ["/up"](inlet) {
    if (inlet === 0) {
      this._countMode = MODE_UP;
    }
  }

  ["/down"](inlet) {
    if (inlet === 0) {
      this._countMode = MODE_DOWN;
    }
  }

  ["/updown"](inlet) {
    if (inlet === 0) {
      this._countMode = MODE_UPDOWN;
    }
  }

  ["/inc"](inlet) {
    if (inlet === 0) {
      this._storedValue = constrain(this._storedValue + 1, this._minValue, this._maxValue);
      this._update();
    }
  }

  ["/dec"](inlet) {
    if (inlet === 0) {
      this._storedValue = constrain(this._storedValue - 1, this._minValue, this._maxValue);
      this._update();
    }
  }

  ["/next"](inlet) {
    if (inlet === 0) {
      this["/bang"](inlet);
    }
  }

  ["/min"](inlet, values) {
    if (inlet === 0) {
      this._minValue = toNumber(values[1])|0;
      if (this._maxValue < this._minValue) {
        this._minValue = this._maxValue;
      }
      this._storedValue = constrain(this._storedValue, this._minValue, this._maxValue);
    }
  }

  ["/max"](inlet, values) {
    if (inlet === 0) {
      this._maxValue = toNumber(values[1])|0;
      if (this._maxValue < this._minValue) {
        this._maxValue = this._minValue + 1;
      }
      this._storedValue = constrain(this._storedValue, this._minValue, this._maxValue);
    }
  }

  ["/carrybang"](inlet) {
    if (inlet === 0) {
      this._carryMode = CARRYFLAG_BANG;
    }
  }

  ["/carryint"](inlet) {
    if (inlet === 0) {
      this._carryMode = CARRYFLAG_NUMERIC;
    }
  }

  ["/flags"](inlet, values) {
    if (inlet === 0) {
      this._carryMode = constrain(toNumber(values[1])|0, 0, 1);
      this._minimumMode = constrain(toNumber(values[2])|0, 0, 1);
    }
  }

  ["/setmin"](inlet, values) {
    if (inlet === 0) {
      this._minimumMode = constrain(toNumber(values[1])|0, 0, 1);
    }
  }

  _update() {
    let emitValue = this._storedValue;

    this._storedValue += this._direction;

    switch (this._mode) {
    case MODE_UP:
      if (this._maxValue <= this._storedValue) {
        this._storedValue = this._minValue;
        this._maxCounter += 1;
        this.postMessage(3, $i(this._maxCounter));
        if (this._carryMode === CARRYFLAG_NUMERIC) {
          this.postMessage(2, $i(1));
        } else {
          this.postMessage(2, $s("bang"));
        }
      } else {
        if (this._carryMode === CARRYFLAG_NUMERIC) {
          this.postMessage(2, $i(0));
        }
      }
      break;
    case MODE_DOWN:
      if (this._storedValue <= this._minValue) {
        this._storedValue = this._maxValue;
        if (this._carryMode === CARRYFLAG_NUMERIC) {
          this.postMessage(1, $i(1));
        } else {
          this.postMessage(1, $s("bang"));
        }
      } else {
        if (this._carryMode === CARRYFLAG_NUMERIC) {
          this.postMessage(1, $i(0));
        }
      }
      break;
    case MODE_UPDOWN:
      if (this._maxValue <= this._storedValue) {
        this._direction = -1;
        this._storedValue = this.maxValue - 1;
        this._maxCounter += 1;
        this.postMessage(3, $i(this._maxCounter));
        if (this._carryMode === CARRYFLAG_NUMERIC) {
          this.postMessage(2, $i(1));
        } else {
          this.postMessage(2, $s("bang"));
        }
      } else {
        if (this._carryMode === CARRYFLAG_NUMERIC) {
          this.postMessage(2, $i(0));
        }
      }
      if (this._storedValue <= this._minValue) {
        this._direction = +1;
        this._storedValue = this._minValue + 1;
        if (this._carryMode === CARRYFLAG_NUMERIC) {
          this.postMessage(1, $i(1));
        } else {
          this.postMessage(1, $s("bang"));
        }
      } else {
        if (this._carryMode === CARRYFLAG_NUMERIC) {
          this.postMessage(1, $i(0));
        }
      }
      break;
    }
    this.postMessage(0, $i(emitValue));
  }
}
