export default class MaxMessage {
  constructor(values) {
    this.values = optimize(values);
  }

  getType() {
    let type = this.values[0].type;

    if (type === "string") {
      return this.values[0].value;
    }

    if (2 <= this.values.length) {
      if (type === "int" || type === "float") {
        return "list";
      }
    }

    return type;
  }

  getValues() {
    let type = this.getType();

    if (type === "int" || type === "float" || type === "list") {
      return this.values.slice();
    }

    return this.values.slice(1);
  }

  toString() {
    if (this.values.length === 1) {
      return this.values[0].toString();
    }
    if (this.getType() === "list") {
      return "[ " + this.values.map(value => value.toString()).join(", ") + " ]";
    }
    return this.values.map(value => value.toString()).join(" ");
  }

  valueOf() {
    if (this.values.length === 1) {
      return this.values[0].valueOf();
    }
    if (this.getType() === "list") {
      return this.values.map(value => value.valueOf());
    }
    return this.values.map(value => value.toString()).join(" ");
  }

  toJSON() {
    return { type: this.getType(), values: this.getValues().map(value => value.toJSON()) };
  }
}

function optimize(values) {
  return values;
}
