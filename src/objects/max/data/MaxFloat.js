import _MaxDataNumberObject from "../_MaxDataNumberObject";

export default class MaxFloat extends _MaxDataNumberObject {
  constructor(...args) {
    super(...args);

    this.outletTypes[0] = "float";
  }
}
