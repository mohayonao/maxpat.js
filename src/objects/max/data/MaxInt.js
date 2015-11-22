import _MaxDataNumberObject from "../_MaxDataNumberObject";

export default class MaxInt extends _MaxDataNumberObject {
  constructor(...args) {
    super(...args);

    this.outletTypes[0] = "int";
  }
}
