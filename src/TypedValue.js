export default class TypedValue {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }

  is(type) {
    return this.type === type;
  }

  to(type) {
    if (type === this.type) {
      return this;
    }
    if (type === "bang") {
      return new TypedValue("bang", "bang");
    }
    if (type === "int") {
      return new TypedValue("int", +this.value|0);
    }
    if (type === "float") {
      return new TypedValue("float", +this.value || 0);
    }
    if (type === "symbol") {
      return new TypedValue("symbol", "" + this.value);
    }
    if (type === "list") {
      return TypedValue.from([ this ]);
    }
    return new TypedValue("int", 0);
  }

  equals(other) {
    return this.value === other.value;
  }

  toNumber() {
    return +this.value || 0;
  }

  toString() {
    if (this.type === "list") {
      return "[ " + this.value.map(value => value.toString()).join(", ") + " ]";
    }
    if (this.type === "float" && this.value === this.value|0) {
      return this.value + ".";
    }
    return "" + this.value;
  }

  valueOf() {
    if (this.type === "list") {
      return this.value.map(value => value.value);
    }
    return this.value;
  }

  toJSON() {
    return { type: this.type, value: this.value };
  }

  static from(value) {
    if (Array.isArray(value)) {
      return new TypedValue("list", value.map(toTypedValue));
    }
    return toTypedValue(value);
  }
}

function toTypedValue(value) {
  if (value instanceof TypedValue) {
    return value;
  }

  if (value == null) {
    return new TypedValue("int", 0);
  }

  if (typeof value === "number") {
    return new TypedValue("float", value);
  }

  if (typeof value === "boolean") {
    return new TypedValue("int", value ? 1 : 0);
  }

  if (typeof value === "string") {
    if (value === "bang") {
      return new TypedValue("bang", "bang");
    }
    if (/^[-+]?\d+\.\d*$/.test(value)) {
      return new TypedValue("float", +value);
    }
    if (/^[-+]?\d+$/.test(value)) {
      return new TypedValue("int", +value);
    }
    if (/^".*"$/.test(value)) {
      return new TypedValue("symbol", value.slice(1, -1));
    }
    return new TypedValue("symbol", value);
  }

  return new TypedValue("int", 0);
}
