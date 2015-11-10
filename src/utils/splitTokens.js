export default function splitTokens(str) {
  return str.match(/(".*?"|[^"\s]+)/g);
}
