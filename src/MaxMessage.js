import TypedValue from "./TypedValue";

export default class MaxMessage {
  constructor(value) {
    this._value = optimize(value);
    this._type = getType(this._value);
  }

  getType() {
    return this._type;
  }

  getValue() {
    return this._value;
  }

  toString() {
    if (isNumberType(this._type)) {
      return this._value.toString();
    }
    if (this._type === "list") {
      return "[ " + this._value.map(value => value.toString()).join(", ") + " ]";
    }
    return this._value.map(value => value.toString()).join(" ");
  }

  valueOf() {
    if (isNumberType(this._type)) {
      return this._value.valueOf();
    }
    if (this._type === "list") {
      return this._value.map(value => value.valueOf());
    }
    return this._value.map(value => value.toString()).join(" ");
  }

  toJSON() {
    if (isNumberType(this._type)) {
      return { type: this._type, value: this._value.toJSON() };
    }
    return { type: this._type, value: this._value.map(value => value.toJSON()) };
  }
}

function isNumberType(type) {
  return type === "int" || type === "float";
}

function getType(value) {
  if (Array.isArray(value)) {
    if (isNumberType(value[0].type)) {
      return "list";
    }
    return value[0].value;
  }

  if (isNumberType(value.type)) {
    return value.type;
  }

  return value.value;
}

function optimize(value) {
  if (!Array.isArray(value)) {
    if (isNumberType(value.type))  {
      return value;
    }
    return [ value ];
  }

  if (2 <= value.length) {
    let penultimateItem = value[value.length - 2];
    let lastItem = value[value.length - 1];

    if (penultimateItem.type === "string" && isNumberType(penultimateItem.value)) {
      value = optimize(value.slice(0, -2).concat(new TypedValue(penultimateItem.value, lastItem.value)));

      if (value.length === 1) {
        return value[0];
      }

      return optimize(value);
    }
  }

  return value;
}
