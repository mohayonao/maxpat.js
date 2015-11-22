import _MaxNumberObject from "../_MaxNumberObject";

export default class MaxFloat extends _MaxNumberObject {
  constructor(...args) {
    super(...args);

    this.outletTypes[0] = "float";
  }
}
