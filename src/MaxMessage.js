import TypedValue from "./TypedValue";

export default class MaxMessage {
  constructor(items) {
    this.items = optimize(items);
  }

  getType() {
    let type = this.items[0].type;

    if (type === "string") {
      return this.items[0].value;
    }

    return type;
  }

  getValues() {
    let type = this.getType();

    if (isNumberType(type)) {
      return this.items.slice();
    }

    return this.items.slice(1);
  }

  getRawValues() {
    return this.getValues().map(value => value.valueOf());
  }

  toString() {
    let type = this.getType();

    if (isNumberType(type)) {
      return this.items[0].toString();
    }
    if (type === "list") {
      return "[ " + this.items.slice(1).map(value => value.toString()).join(", ") + " ]";
    }
    return this.items.map(value => value.toString()).join(" ");
  }

  valueOf() {
    let type = this.getType();

    if (isNumberType(type)) {
      return this.items[0].valueOf();
    }
    if (type === "list") {
      return this.items.slice(1).map(value => value.valueOf());
    }
    return this.items.map(value => value.toString()).join(" ");
  }

  toJSON() {
    return { type: this.getType(), values: this.getValues().map(value => value.toJSON()) };
  }
}

function isNumberType(type) {
  return type === "int" || type === "float";
}

function optimize(items) {
  if (2 <= items.length) {
    if (isNumberType(items[0].type)) {
      return [ TypedValue.from("list") ].concat(items);
    }

    let penultimateItem = items[items.length - 2];
    let lastItem = items[items.length - 1];

    if (penultimateItem.type === "string" && isNumberType(penultimateItem.value)) {
      return optimize(items.slice(0, -2).concat(new TypedValue(penultimateItem.value, lastItem.value)));
    }
  }
  return items;
}
