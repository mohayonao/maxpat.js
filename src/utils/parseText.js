import splitTokens from "./splitTokens";
import TypedValue from "../TypedValue";

export default function parseText(text) {
  let tokens = splitTokens(text);
  let index = 1;
  let tagName = tokens[0] || "";
  let args = [];
  let attrs = {};

  while (tokens[index] && tokens[index][0] !== "@") {
    args.push(TypedValue.from(tokens[index++]));
  }

  while (tokens[index] && tokens[index][0] === "@") {
    let key = tokens[index++].slice(1);
    let list = [];

    while (tokens[index] && tokens[index][0] !== "@") {
      list.push(TypedValue.from(tokens[index++]));
    }

    attrs[key] = list;
  }

  return { tagName, args, attrs };
}
