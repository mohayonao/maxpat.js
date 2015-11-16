export default function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  return [ value ];
}
