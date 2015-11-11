export default function splitTokens(str) {
  if (str == null) {
    return [];
  }
  return str.match(/(".*?"|[^"\s]+)/g) || [];
}
