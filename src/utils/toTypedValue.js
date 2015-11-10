function toArray(value) {
  return Array.isArray(value) ? value : [ value ];
}

function toTypedScalarValue(value) {
  if (value == null) {
    return { type: "int", value: 0 };
  }

  if (typeof value === "number") {
    return { type: "float", value: value };
  }

  if (typeof value === "boolean") {
    return { type: "int", value: value ? 1 : 0 };
  }

  if (typeof value === "string") {
    if (value === "bang") {
      return { type: "bang", value: "bang" };
    }
    if (/^[-+]?\d+\.\d*$/.test(value)) {
      return { type: "float", value: +value };
    }
    if (/^[-+]?\d+$/.test(value)) {
      return { type: "int", value: +value };
    }
    return { type: "symbol", value: value };
  }

  if (typeof value === "object") {
    if (value.type === "bang") {
      return { type: "bang", value: "bang" };
    }
    if (value.type === "int") {
      return { type: "int", value: +value.value|0 };
    }
    if (value.type === "float") {
      return { type: "float", value: +value.value };
    }
    if (value.type === "symbol") {
      return { type: "symbol", value: "" + value.value };
    }
    if (value.type === "list") {
      return { type: "list", value: toArray(value.value).map(toTypedScalarValue) };
    }
  }

  return { type: "bang", value: "bang" };
}

export default function toTypedValue(value) {
  if (Array.isArray(value)) {
    return { type: "list", value: value.map(toTypedScalarValue) };
  }
  return toTypedScalarValue(value);
}
