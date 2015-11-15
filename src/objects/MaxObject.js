import { EventEmitter } from "evetns";

export default class MaxObject extends EventEmitter {
  constructor(patcher, opts) {
    super();

    this.patcher = patcher;
    this.id = opts.id;
    this.className = opts.className;
    this.tagName = opts.tagName;
    this.numOfInlets = opts.numOfInlets;
    this.numOfOutlets = opts.numOfOutlets;
    this.outletTypes = opts.outletTypes;
    this.patchingRect = opts.patchingRect;

    this.inlets = [];
    this.outlets = [];

    this.initialize(opts);
  }

  initialize() {}

  sendMessage() {}
}
