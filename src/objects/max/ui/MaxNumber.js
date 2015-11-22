import _MaxUINumberBoxObject from "../_MaxUINumberBoxObject";

export default class MaxNumber extends _MaxUINumberBoxObject {
  constructor(...args) {
    super(...args);

    this.outletTypes[0] = "int";
  }
}
