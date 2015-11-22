import _MaxNumberBoxObject from "../_MaxNumberBoxObject";

export default class MaxFloatNumberObject extends _MaxNumberBoxObject {
  constructor(...args) {
    super(...args);

    this.outletTypes[0] = "float";
  }
}
