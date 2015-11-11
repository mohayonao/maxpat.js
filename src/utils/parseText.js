import splitTokens from "./splitTokens";
import toTypedValue from "./toTypedValue";

export default function parseText(text) {
  let tokens = splitTokens(text);
  let index = 1;
  let klassName = tokens[0] || "";
  let args = [];
  let attrs = {};

  while (tokens[index] && tokens[index][0] !== "@") {
    args.push(toTypedValue(tokens[index++]));
  }

  while (tokens[index] && tokens[index][0] === "@") {
    let key = tokens[index++].substr(1);
    let list = [];

    while (tokens[index] && tokens[index][0] !== "@") {
      list.push(tokens[index++]);
    }

    if (list.length) {
      if (list.length === 1) {
        attrs[key] = toTypedValue(list[0]);
      } else {
        attrs[key] = toTypedValue(list);
      }
    }
  }

  return { klassName, args, attrs };
}
