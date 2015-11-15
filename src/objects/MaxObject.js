import EventEmitter from "../EventEmitter";
import _findIndex from "lodash.findindex";
import _isEqual from "lodash.isequal";

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

    this._connections = [];

    this.initialize(opts);
  }

  initialize() {}

  connect(destination, outlet, inlet) {
    if (0 <= outlet && outlet < this.numOfOutlets) {
      let items = { destination, outlet, inlet };
      let index = _findIndex(this._connections, conn => _isEqual(conn, items));

      if (index === -1) {
        this._connections.push(items);
        this._connections.sort(sortByPosition);
      }
    }
  }

  disconnect(destination, outlet, inlet) {
    if (0 <= outlet && outlet < this.numOfOutlets) {
      let items = { destination, outlet, inlet };
      let index = _findIndex(this._connections, conn => _isEqual(conn, items));

      if (index === -1) {
        this._connections.splice(index, 1);
      }
    }
  }

  sendMessage(outlet, message) {
    let targets = this._connections.filter(conn => conn.outlet === outlet);

    for (let i = targets.length - 1; i >= 0; i--) {
      targets[i].destination.recvMessage(targets[i].inlet, message);
    }
  }

  recvMessage(inlet, message) {
    if (0 <= inlet && inlet <= this.numOfInlets) {
      let type = message.getType();
      let address = `/${type}`;

      if (typeof this[address] === "function") {
        this[address](inlet, message.getValues());
      } else if (typeof this["/anything"] === "function") {
        this["/anything"](inlet, message.items);
      }
    }
  }
}

function sortByPosition(a, b) {
  a = a.destination;
  b = b.destination;

  if (a.patchingRect[0] !== b.patchingRect[0]) {
    return a.patchingRect[0] - b.patchingRect[0];
  }
  return b.patchingRect[1] - a.patchingRect[1];
}
