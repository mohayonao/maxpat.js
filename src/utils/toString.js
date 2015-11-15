export default function toString(value) {
  if (typeof value === "string") {
    return value;
  }
  if (value == null) {
    return "" + value;
  }
  return value.toString();
}
