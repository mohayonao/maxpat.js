import EventEmitter from "./EventEmitter";
import Database from "./Database";

export default class MaxPatch extends EventEmitter {
  constructor(runtime) {
    super();

    this.runtime = runtime;
    this.db = new Database();
  }

  addElement(element) {
    this.db.addElement(element);
  }

  removeElement(element) {
    this.db.removeElement(element);
  }

  getElementById(id) {
    return this.db.getElementById(id);
  }

  getElementsByClassName(name) {
    return this.db.getElementsByClassName(name);
  }

  getElementsByName(name) {
    return this.db.getElementsByName(name);
  }

  getElementsByTagName(name) {
    return this.db.getElementsByTagName(name);
  }

  querySelector(query) {
    return this.db.querySelector(query);
  }

  querySelectorAll(query) {
    return this.db.querySelectorAll(query);
  }
}
