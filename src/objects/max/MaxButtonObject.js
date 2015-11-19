import MaxObject from "../MaxObject";
import TypedValue from "../../TypedValue";

export default class MaxButtonObject extends MaxObject {
  ["/:else"]() {
    this.sendMessage(0, new TypedValue("string", "bang"));
  }
}
