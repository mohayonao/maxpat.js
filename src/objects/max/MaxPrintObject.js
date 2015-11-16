import MaxObject from "../MaxObject";
import toNumber from "../../utils/toNumber";
import toString from "../../utils/toString";

export default class MaxPrintObject extends MaxObject {
  initialize(opts) {
    this._id = opts.args[0] ? toString(opts.args[0]) : "print";
    this._popup = opts.attrs.popup ? toNumber(opts.attrs.popup[0]) : 0;
  }

  ["/anything"](inlet, values) {
    if (inlet === 0) {
      let id = this._id;
      let popup = this._popup;
      let value = values.map(value => value.toString()).join(" ");

      this.patcher.emit("print", { id, popup, value });
    }
  }
}
