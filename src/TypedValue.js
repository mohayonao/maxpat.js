export default class TypedValue {
  constructor(type, value) {
    this.type = type;
    this.value = to(type, value);
  }

  is(type) {
    return this.type === type;
  }

  to(type) {
    if (type === this.type) {
      return this;
    }
    if (type === "int") {
      return new TypedValue("int", +this.value|0);
    }
    if (type === "float") {
      return new TypedValue("float", +this.value || 0);
    }
    if (type === "string") {
      return new TypedValue("string", this.toString());
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
    if (this.type === "float" && this.value === this.value|0) {
      return this.value + ".0";
    }
    return "" + this.value;
  }

  valueOf() {
    return this.value;
  }

  toJSON() {
    return { type: this.type, value: this.value };
  }

  static from(value) {
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
      if (/^[-+]?\d+\.\d*$/.test(value)) {
        return new TypedValue("float", +value);
      }
      if (/^[-+]?\d+$/.test(value)) {
        return new TypedValue("int", +value);
      }
      return new TypedValue("string", value.replace(/^"(.*?)"$/, "$1"));
    }

    return new TypedValue("int", 0);
  }
}

function to(type, value) {
  if (type === "int") {
    return +value|0;
  }
  if (type === "float") {
    return +value || 0;
  }
  if (type === "string") {
    return value.toString();
  }
  return 0;
}

export function $i(value) {
  return new TypedValue("int", value);
}

export function $f(value) {
  return new TypedValue("float", value);
}

export function $s(value) {
  return new TypedValue("string", value);
}
