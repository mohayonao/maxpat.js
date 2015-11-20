import MaxObject from "../MaxObject";
import { $s } from "../../TypedValue";

export default class MaxButtonObject extends MaxObject {
  ["/:else"]() {
    this.sendMessage(0, $s("bang"));
  }
}
