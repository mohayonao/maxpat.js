import _findIndex from "lodash.findindex";

export default class Database {
  constructor() {
    this.elements = [];
    this.indexes = {};
  }

  hasElement(element) {
    return this.elements.indexOf(element) !== -1;
  }

  addElement(element) {
    let index = _findIndex(this.elements, elem => elem.id === element.id);

    if (index === -1) {
      this.elements.push(element);
    }

    this.indexes[element.id] = element;
  }

  removeElement(element) {
    let index = _findIndex(this.elements, elem => elem.id === element.id);

    if (index !== -1) {
      this.elements.splice(index, 1);
    }

    this.indexes[element.id] = null;
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
