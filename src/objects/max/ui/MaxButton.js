import MaxObject from "../../MaxObject";
import { $s } from "../../../TypedValue";

export default class MaxButton extends MaxObject {
  ["/:else"]() {
    this.sendMessage(0, $s("bang"));
  }
}
