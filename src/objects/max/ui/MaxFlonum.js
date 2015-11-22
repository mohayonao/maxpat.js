import _MaxNumberBoxObject from "../_MaxNumberBoxObject";

export default class MaxFlonum extends _MaxNumberBoxObject {
  constructor(...args) {
    super(...args);

    this.outletTypes[0] = "float";
  }
}
