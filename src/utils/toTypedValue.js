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
    if (/^".*"/.test(value)) {
      return { type: "symbol", value: value.slice(1, -1) };
    }
    return { type: "symbol", value: value };
  }

  if (typeof value === "object" && typeof value.type === "string") {
    return { type: value.type, value: value.value };
  }

  // FIXME: !!??
  return { type: "int", value: 0 };
}

export default function toTypedValue(value) {
  if (Array.isArray(value)) {
    return { type: "list", value: value.map(toTypedScalarValue) };
  }
  return toTypedScalarValue(value);
}
