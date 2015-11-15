
import appendIfNotExists from "./utils/appendIfNotExists";
import removeIfExists from "./utils/removeIfExists";

export default class Database {
  constructor() {
    this.elements = [];
    this.indexes = {};
  }

  hasElement(element) {
    return this.elements.indexOf(element) !== -1;
  }

  addElement(element) {
    if (appendIfNotExists(this.elements, element)) {
      this.indexes[element.id] = element;
    }
  }

  removeElement(element) {
    if (removeIfExists(this.elements, element)) {
      this.indexes[element.id] = null;
    }
  }

  getElementById(id) {
    if (this.indexes.hasOwnProperty(id)) {
      return this.indexes[id];
    }
    return null;
  }

  getElementsByClassName(name) {
    return this.elements.filter(element => element.className === name);
  }

  getElementsByName(name) {
    return this.elements.filter(element => element.name === name);
  }

  getElementsByTagName(name) {
    return this.elements.filter(element => element.tagName === name);
  }

  querySelector(query) {
    return this.querySelectorAll(query)[0] || null;
  }

  querySelectorAll() {
    return [];
  }
}
