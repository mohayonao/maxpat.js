import assert from "power-assert";
import Database from "../src/Database";

describe("Database", () => {
  describe("constructor", () => {
    it("works", () => {
      let db = new Database();

      assert(db instanceof Database);
    });
  });
  describe("#hasElement(element: object): boolean", () => {
    it("works", () => {
      let db = new Database();
      let elem1 = { id: "obj-1" };
      let elem2 = { id: "obj-2" };
      let elem3 = { id: "obj-3" };

      db.addElement(elem1);
      db.addElement(elem2);

      assert(db.hasElement(elem1) === true);
      assert(db.hasElement(elem2) === true);
      assert(db.hasElement(elem3) === false);
    });
  });
  describe("#addElement(element: object): void", () => {
    it("works", () => {
      let db = new Database();
      let elem1 = { id: "obj-1", name: "foo", className: "odd" , tagName: "f" };
      let elem2 = { id: "obj-2", name: "foo", className: "even", tagName: "f" };
      let elem3 = { id: "obj-3", name: "bar", className: "odd" , tagName: "b" };
      let elem4 = { id: "obj-4", name: "bar", className: "even", tagName: "b" };
      let elem5 = { id: "obj-5", name: "baz", className: "odd" , tagName: "b" };
      let elem6 = { id: "obj-6", name: "baz", className: "even", tagName: "b" };

      db.addElement(elem1);
      db.addElement(elem2);
      db.addElement(elem5);
      db.addElement(elem6);
      db.addElement(elem1);
      db.addElement(elem2);
      db.addElement(elem5);
      db.addElement(elem6);

      assert(db.hasElement(elem1) === true);
      assert(db.hasElement(elem2) === true);
      assert(db.hasElement(elem3) === false);
      assert(db.hasElement(elem4) === false);
      assert(db.hasElement(elem5) === true);
      assert(db.hasElement(elem6) === true);
    });
  });
  describe("#removeElement(element: object): void", () => {
    it("works", () => {
      let db = new Database();
      let elem1 = { id: "obj-1", name: "foo", className: "odd" , tagName: "f" };
      let elem2 = { id: "obj-2", name: "foo", className: "even", tagName: "f" };
      let elem3 = { id: "obj-3", name: "bar", className: "odd" , tagName: "b" };
      let elem4 = { id: "obj-4", name: "bar", className: "even", tagName: "b" };
      let elem5 = { id: "obj-5", name: "baz", className: "odd" , tagName: "b" };
      let elem6 = { id: "obj-6", name: "baz", className: "even", tagName: "b" };

      db.addElement(elem1);
      db.addElement(elem2);
      db.addElement(elem3);
      db.addElement(elem4);
      db.addElement(elem5);
      db.addElement(elem6);
      db.removeElement(elem2);
      db.removeElement(elem5);
      db.removeElement(elem2);
      db.removeElement(elem5);

      assert(db.hasElement(elem1) === true);
      assert(db.hasElement(elem2) === false);
      assert(db.hasElement(elem3) === true);
      assert(db.hasElement(elem4) === true);
      assert(db.hasElement(elem5) === false);
      assert(db.hasElement(elem6) === true);
    });
  });
  describe("#getElementById(id: string): object", () => {
    it("works", () => {
      let db = new Database();
      let elem1 = { id: "obj-1", name: "foo", className: "odd" , tagName: "f" };
      let elem2 = { id: "obj-2", name: "foo", className: "even", tagName: "f" };
      let elem3 = { id: "obj-3", name: "bar", className: "odd" , tagName: "b" };
      let elem4 = { id: "obj-4", name: "bar", className: "even", tagName: "b" };
      let elem5 = { id: "obj-5", name: "baz", className: "odd" , tagName: "b" };
      let elem6 = { id: "obj-6", name: "baz", className: "even", tagName: "b" };

      db.addElement(elem1);
      db.addElement(elem2);
      db.addElement(elem3);
      db.addElement(elem4);
      db.addElement(elem5);
      db.addElement(elem6);

      assert(db.getElementById("obj-1") === elem1);
      assert(db.getElementById("obj-2") === elem2);
      assert(db.getElementById("obj-3") === elem3);
      assert(db.getElementById("obj-4") === elem4);
      assert(db.getElementById("obj-5") === elem5);
      assert(db.getElementById("obj-6") === elem6);
      assert(db.getElementById("obj-7") === null);
      assert(db.getElementById("obj-8") === null);
      assert(db.getElementById("obj-9") === null);
    });
  });
  describe("#getElementsByClassName(name: string): object[]", () => {
    it("works", () => {
      let db = new Database();
      let elem1 = { id: "obj-1", name: "foo", className: "odd" , tagName: "f" };
      let elem2 = { id: "obj-2", name: "foo", className: "even", tagName: "f" };
      let elem3 = { id: "obj-3", name: "bar", className: "odd" , tagName: "b" };
      let elem4 = { id: "obj-4", name: "bar", className: "even", tagName: "b" };
      let elem5 = { id: "obj-5", name: "baz", className: "odd" , tagName: "b" };
      let elem6 = { id: "obj-6", name: "baz", className: "even", tagName: "b" };

      db.addElement(elem1);
      db.addElement(elem2);
      db.addElement(elem3);
      db.addElement(elem4);
      db.addElement(elem5);
      db.addElement(elem6);

      assert.deepEqual(db.getElementsByClassName("odd"), [ elem1, elem3, elem5 ]);
      assert.deepEqual(db.getElementsByClassName("even"), [ elem2, elem4, elem6 ]);
      assert.deepEqual(db.getElementsByClassName("prime"), []);
    });
  });
  describe("#getElementsByName(name: string): object[]", () => {
    it("works", () => {
      let db = new Database();
      let elem1 = { id: "obj-1", name: "foo", className: "odd" , tagName: "f" };
      let elem2 = { id: "obj-2", name: "foo", className: "even", tagName: "f" };
      let elem3 = { id: "obj-3", name: "bar", className: "odd" , tagName: "b" };
      let elem4 = { id: "obj-4", name: "bar", className: "even", tagName: "b" };
      let elem5 = { id: "obj-5", name: "baz", className: "odd" , tagName: "b" };
      let elem6 = { id: "obj-6", name: "baz", className: "even", tagName: "b" };

      db.addElement(elem1);
      db.addElement(elem2);
      db.addElement(elem3);
      db.addElement(elem4);
      db.addElement(elem5);
      db.addElement(elem6);

      assert.deepEqual(db.getElementsByName("foo"), [ elem1, elem2 ]);
      assert.deepEqual(db.getElementsByName("bar"), [ elem3, elem4 ]);
      assert.deepEqual(db.getElementsByName("baz"), [ elem5, elem6 ]);
      assert.deepEqual(db.getElementsByName("qux"), []);
    });
  });
  describe("#getElementsByTagName(name: string): object[]", () => {
    it("works", () => {
      let db = new Database();
      let elem1 = { id: "obj-1", name: "foo", className: "odd" , tagName: "f" };
      let elem2 = { id: "obj-2", name: "foo", className: "even", tagName: "f" };
      let elem3 = { id: "obj-3", name: "bar", className: "odd" , tagName: "b" };
      let elem4 = { id: "obj-4", name: "bar", className: "even", tagName: "b" };
      let elem5 = { id: "obj-5", name: "baz", className: "odd" , tagName: "b" };
      let elem6 = { id: "obj-6", name: "baz", className: "even", tagName: "b" };

      db.addElement(elem1);
      db.addElement(elem2);
      db.addElement(elem3);
      db.addElement(elem4);
      db.addElement(elem5);
      db.addElement(elem6);

      assert.deepEqual(db.getElementsByTagName("f"), [ elem1, elem2 ]);
      assert.deepEqual(db.getElementsByTagName("b"), [ elem3, elem4, elem5, elem6 ]);
      assert.deepEqual(db.getElementsByTagName("q"), []);
    });
  });
  describe("#querySelector(query: string): object", () => {
    it("works", () => {
      let db = new Database();
      let elem1 = { id: "obj-1", name: "foo", className: "odd" , tagName: "f" };
      let elem2 = { id: "obj-2", name: "foo", className: "even", tagName: "f" };
      let elem3 = { id: "obj-3", name: "bar", className: "odd" , tagName: "b" };
      let elem4 = { id: "obj-4", name: "bar", className: "even", tagName: "b" };
      let elem5 = { id: "obj-5", name: "baz", className: "odd" , tagName: "b" };
      let elem6 = { id: "obj-6", name: "baz", className: "even", tagName: "b" };

      db.addElement(elem1);
      db.addElement(elem2);
      db.addElement(elem3);
      db.addElement(elem4);
      db.addElement(elem5);
      db.addElement(elem6);

      assert(db.querySelector("") === null);
    });
  });
  describe("#querySelectorAll(query: string): object[]", () => {
    it("works", () => {
      let db = new Database();
      let elem1 = { id: "obj-1", name: "foo", className: "odd" , tagName: "f" };
      let elem2 = { id: "obj-2", name: "foo", className: "even", tagName: "f" };
      let elem3 = { id: "obj-3", name: "bar", className: "odd" , tagName: "b" };
      let elem4 = { id: "obj-4", name: "bar", className: "even", tagName: "b" };
      let elem5 = { id: "obj-5", name: "baz", className: "odd" , tagName: "b" };
      let elem6 = { id: "obj-6", name: "baz", className: "even", tagName: "b" };

      db.addElement(elem1);
      db.addElement(elem2);
      db.addElement(elem3);
      db.addElement(elem4);
      db.addElement(elem5);
      db.addElement(elem6);

      assert.deepEqual(db.querySelectorAll(""), []);
    });
  });
});
