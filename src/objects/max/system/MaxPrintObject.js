import MaxObject from "../../MaxObject";
import defaults from "../../../utils/defaults";
import toNumber from "../../../utils/toNumber";
import toString from "../../../utils/toString";

export default class MaxPrintObject extends MaxObject {
  initialize(opts) {
    this._id = toString(defaults(opts.args[0], "print"));
    this._popup = toNumber(defaults(opts.attrs.popup, 0));
  }

  ["/:else"](inlet, values) {
    let id = this._id;
    let popup = this._popup;
    let value = values.map(value => value.toString()).join(" ");

    this.patcher.emit("print", { id, popup, value });
  }
}
