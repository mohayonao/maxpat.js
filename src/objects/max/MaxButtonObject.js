import MaxObject from "../MaxObject";
import { $s } from "../../TypedValue";

export default class MaxButtonObject extends MaxObject {
  ["/anything"]() {
    this.sendMessage(0, $s("bang"));
  }
}
