import _MaxNumberBoxObject from "./_MaxNumberBoxObject";

export default class MaxNumberBoxIntObject extends _MaxNumberBoxObject {
  constructor(...args) {
    super(...args);

    this.outletTypes[0] = "int";
  }
}
