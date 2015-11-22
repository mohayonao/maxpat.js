import _MaxUINumberBoxObject from "../_MaxUINumberBoxObject";

export default class MaxFlonum extends _MaxUINumberBoxObject {
  constructor(...args) {
    super(...args);

    this.outletTypes[0] = "float";
  }
}
