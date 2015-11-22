import _MaxNumberObject from "../_MaxNumberObject";

export default class MaxNumberFloatObject extends _MaxNumberObject {
  constructor(...args) {
    super(...args);

    this.outletTypes[0] = "float";
  }
}
