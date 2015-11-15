export default function toNumber(value) {
  if (typeof value === "number") {
    return value;
  }
  if (value == null) {
    return 0;
  }
  return +value.valueOf() || 0;
}
