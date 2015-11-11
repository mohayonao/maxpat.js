import splitTokens from "./splitTokens";
import TypedValue from "../TypedValue";

export default function parseText(text) {
  let tokens = splitTokens(text);
  let index = 1;
  let klassName = tokens[0] || "";
  let args = [];
  let attrs = {};

  while (tokens[index] && tokens[index][0] !== "@") {
    args.push(TypedValue.from(tokens[index++]));
  }

  while (tokens[index] && tokens[index][0] === "@") {
    let key = tokens[index++].slice(1);
    let list = [];

    while (tokens[index] && tokens[index][0] !== "@") {
      list.push(tokens[index++]);
    }

    if (list.length === 0) {
      attrs[key] = TypedValue.from(0);
    } else if (list.length === 1) {
      attrs[key] = TypedValue.from(list[0]);
    } else {
      attrs[key] = TypedValue.from(list);
    }
  }

  return { klassName, args, attrs };
}
